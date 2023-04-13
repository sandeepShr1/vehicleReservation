const Order = require("../model/orderModel");
const Car = require("../model/carModel");
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncErrors");
const sendEmail = require("../utils/sendEmail");


// create a order
exports.createOrder = catchAsyncError(async (req, res, next) => {
      const {
            car,
            from,
            to,
            status,
            price,
            paymentInfo,
            car_name
      } = req.body;
      console.log(req.user)


      const order = await Order.create({
            car,
            from,
            to,
            status,
            price,
            paymentInfo,
            paidAt: Date.now(),
            user: req.user._id
      });


      const message = `Thank you for renting ${car_name}. Your total is:- \n\n Rs. ${price}\n\n From:- ${from}\n\n To:- ${to} \n\nIf you have not rented car then, please ignore it`;

      try {
            await sendEmail({
                  email: req.user.email,
                  subject: `Vehicle rented successfully `,
                  message,
            })
            res.status(200).json({
                  success: true,
                  message: `Email sent to ${req.user.email} successfully`
            });

      } catch (error) {
            return next(new ErrorHandler(
                  error.message, 500
            ))
      }
      res.status(200).json({
            success: true,
            order
      })
});

// get Single Order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
      const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
      );

      if (!order) {
            return next(new ErrorHander("Order not found with this Id", 404));
      }

      res.status(200).json({
            success: true,
            order,
      });
});

// get logged in user  Orders
exports.myOrders = catchAsyncError(async (req, res, next) => {
      const orders = await Order.find({ user: req.user._id });

      res.status(200).json({
            success: true,
            orders,
      });
});

// get all  Orders admin
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
      const orders = await Order.find();

      let totalAmount = 0;
      orders.forEach(order => {
            totalAmount += order.totalPrice;
      })

      res.status(200).json({
            success: true,
            totalAmount,
            orders,
      });
});

// get  Order status admin
exports.updateOrder = catchAsyncError(async (req, res, next) => {
      const order = await Order.findById(req.params.id);

      if (!order) {
            return next(new ErrorHandler("Car not found!", 404));
      }

      if (order.status === "paid") {
            return next(new ErrorHandler("Already Paid", 400));
      }


      if (req.body.status === "cancelled") {
            order.orderItems.forEach(async (o) => {
                  await updateStock(o.car, o.quantity);
            });

      }
      order.orderStatus = req.body.status;

      if (req.body.status === "Delivered") {
            order.deliveredAt = Date.now();
      }
      await order.save({ validateBeforeSave: false });

      res.status(200).json({
            success: true,
            order
      });
});

async function updateStock(id, quantity) {
      const car = await Car.findById(id);

      car.stock -= quantity;

      await car.save({ validateBeforeSave: false });
}

// delete Orders admin
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
      const order = await Order.findById(req.params.id);

      if (!order) {
            return next(new ErrorHandler("Car not found!", 404));
      }
      await order.remove();
      res.status(200).json({
            success: true,
      });
});