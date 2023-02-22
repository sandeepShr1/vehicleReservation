const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter car name"],
        trim: true
    },
    model: {
        type: String,
        required: [true, "Please enter car model"]
    },
    year: {
        type: Number,
        required: [true, "Please enter model year"]
    },
    description: {
        type: String,
        required: [true, "Please enter car description"]
    },
    price: {
        type: Number,
        required: [true, "Please enter price"],
        maxLength: [8, "Price cannot exceed 8 character."]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            name: {
                type: String,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Car", carSchema); 