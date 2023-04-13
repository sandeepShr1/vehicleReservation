const Contact = require("../model/contactModal");
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

// create car only admin
exports.createContact = catchAsyncError(async (req, res, next) => {


    const message = await Contact.create(req.body);

    res.status(201).json({
        success: true,
        message
    })
});

// get all contacts admin
exports.getContactList = catchAsyncError(async (req, res, next) => {
    const contacts = await Contact.find();
    res.status(201).json({
        success: true,
        contacts
    })
})

