const express = require("express");
const { verifyPayment } = require("../controllers/paymentController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");

router.route("/payment/verify").post(isAuthenticatedUser, verifyPayment);


module.exports = router;