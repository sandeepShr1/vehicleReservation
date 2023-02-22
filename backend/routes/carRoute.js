const express = require('express');
const { getAllCars, createCar, updateCar, deleteCar, getCarDetails, createCarReview, getCarReviews, deleteReview, getCarList } = require('../controllers/carsControllers');
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");

const router = express.Router();

router.route("/admin/car/new").post(isAuthenticatedUser, authorizeRole("admin"), createCar);
router.route("/cars").get(getAllCars);
router.route("/admin/cars").get(isAuthenticatedUser, authorizeRole("admin"), getCarList);
router.route("/admin/update/:id").put(isAuthenticatedUser, authorizeRole("admin"), updateCar);
router.route("/admin/car/:id")
      .delete(isAuthenticatedUser, authorizeRole("admin"), deleteCar);
router.route("/car/:id").get(getCarDetails);
router.route("/review").put(isAuthenticatedUser, createCarReview);
router.route("/reviews").get(getCarReviews).delete(isAuthenticatedUser, deleteReview);

module.exports = router;