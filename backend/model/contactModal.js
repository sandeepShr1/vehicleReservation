const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "Please enter first name"],
        trim: true
    },
    last_name: {
        type: String,
        required: [true, "Please enter last name"],
        trim: true
    },
    phone: {
        type: Number,
        required: [true, "Please enter Phone number"]
    },
    email: {
        type: String,
        required: [true, "Please enter email"]
    },
    description: {
        type: String,
        required: [true, "Please enter car description"]
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Contact", contactSchema); 