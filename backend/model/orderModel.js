const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
      car: {
            type: mongoose.Schema.ObjectId,
            required: [true, "can't be blank"],
            ref: 'Car'
      },
      from: {
            type: Date,
            required: [true, "can't be blank"]
      },
      to: {
            type: Date,
            required: [true, "can't be blank"]
      },
      user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
      },
      status: {
            type: String,
            enum: [
                  "pending",
                  "paid",
                  "reserved",
                  "cancelled",
            ],
            required: [true, "can't be blank"],
      },
      cancellation: {
            type: Boolean,
            default: false
      },

      price: {
            type: Number,
            required: [true, "can't be blank"],
      },
      cancelRequest: {
            type: Boolean,
            default: false
      },
      paymentInfo: {
            id: {
                  type: String,
                  required: false
            },
            status: {
                  type: String,
                  required: false
            }
      },
      paidAt: {
            type: Date,
            required: true
      },
      createdAt: {
            type: Date,
            default: Date.now,
      }

});

module.exports = mongoose.model("Order", orderSchema);