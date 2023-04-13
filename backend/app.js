const express = require('express');
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path")


const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());


// Route imports
const car = require("./routes/carRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute")
const payment = require("./routes/paymentRoutes")
const contact = require("./routes/contactRoute")

//config 
if (process.env.NODE_ENV !== "PRODUCTION") {

      require("dotenv").config({ path: "backend/config/config.env" })
}

app.use('/api/v1', car);
app.use('/api/v1', user);
app.use('/api/v1', order);
app.use('/api/v1', payment);
app.use('/api/v1', contact);


// middle for error
app.use(errorMiddleware);


module.exports = app;