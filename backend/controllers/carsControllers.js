const Car = require("../model/carModel");
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// create car only admin
exports.createCar = catchAsyncError(async (req, res, next) => {

    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    }
    else {
        images = req.body.images;
    }

    let imagesLink = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "cars"
        });

        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url,
        })

    }

    req.body.images = imagesLink;
    req.body.user = req.user.id;
    const car = await Car.create(req.body);

    res.status(201).json({
        success: true,
        car
    })
});

// get all cars admin
exports.getCarList = catchAsyncError(async (req, res, next) => {
    const cars = await Car.find();
    res.status(201).json({
        success: true,
        cars
    })
})

// get all cars
exports.getAllCars = catchAsyncError(async (req, res, next) => {

    const resultPerPage = 10;
    const carsCount = await Car.countDocuments();
    const apiFeature = new ApiFeatures(Car.find().sort({ created_at: -1 }), req.query)
        .search().filter()

    let cars = await apiFeature.query;

    let filteredCarsCount = cars.length;

    apiFeature.pagination(resultPerPage);


    cars = await apiFeature.query.clone();

    res.status(200).json({
        success: true,
        cars,
        carsCount,
        resultPerPage,
        filteredCarsCount
    })
});

// update a car -only admin
exports.updateCar = catchAsyncError(async (req, res, next) => {
    let car = await Car.findById(req.params.id);

    if (!car) {
        return res.status(500).json({
            success: false,
            "message": "car not found!"
        })
    }

    if (req.body.images !== undefined) {


        // images start from here
        let images = [];

        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        }
        else {
            images = req.body.images;
        }

        if (images !== undefined) {
            // Deleting car imgs from cloudinary
            for (let i = 0; i < car.images.length; i++) {
                await cloudinary.v2.uploader.destroy(
                    car.images[i].public_id
                );

            }
        }

        let imagesLink = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "cars"
            });

            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url,
            })

        }
        req.body.images = imagesLink;
    }


    car = await Car.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        car
    })
});

// delete a car -- admin
exports.deleteCar = catchAsyncError(async (req, res, next) => {
    const car = await Car.findById(req.params.id);

    if (!car) {
        return next(new ErrorHandler("Car not found", 404));
    }
    // Deleting car imgs from cloudinary
    for (let i = 0; i < car.images.length; i++) {
        await cloudinary.v2.uploader.destroy(
            car.images[i].public_id
        );

    }


    await car.remove();

    res.status(200).json({
        success: true,
        message: "car removed successfully"
    })

})


// get a single car 

exports.getCarDetails = catchAsyncError(async (req, res, next) => {
    const car = await Car.findById(req.params.id);
    if (!car) {
        return next(new ErrorHandler("Car not found", 404))
    }
    const allCars = await Car.find();
    const similarCars = allCars.filter((p) => { return p._id !== car._id && p.category === car.category });

    res.status(200).json({
        success: true,
        car,
        similarCars
    })

});

// create a new reviews or update the review
exports.createCarReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, carId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    };

    const car = await Car.findById(carId);

    const isReviewed = car.reviews.find((rev) => rev.user.toString() === req.user._id.toString());

    if (isReviewed) {
        car.reviews.forEach(rev => {
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating), (rev.comment = comment);

        });
    }
    else {
        car.reviews.push(review);
        car.numOfReviews = car.reviews.length
    }

    let avg = 0;

    car.reviews.forEach((rev) => {
        avg += rev.rating;
    });

    car.ratings = avg / car.reviews.length;

    await car.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
    })
});

// Get all reviews fo single car
exports.getCarReviews = catchAsyncError(async (req, res, next) => {
    const car = await Car.findById(req.query.id);

    if (!car) {
        return next(new ErrorHandler("Car not found!", 404));
    }

    res.status(200).json({
        success: true,
        reviews: car.reviews,
    });

});

// Delete a review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const car = await Car.findById(req.query.carId);

    if (!car) {
        return next(new ErrorHander("Car not found", 404));
    }

    const reviews = car.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Car.findByIdAndUpdate(
        req.query.carId,
        {
            reviews,
            ratings,
            numOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json({
        success: true,
    });
});