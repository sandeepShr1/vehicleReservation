const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncErrors");

// verifying payment
exports.verifyPayment = catchAsyncError(async (req, res, next) => {

      const { token, amount, car, cai_id } = req.body;
      res.status(201).json({
            success: true,
            token, amount, car, cai_id
      })
});