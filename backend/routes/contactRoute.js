const express = require('express');
const { createContact, getContactList } = require('../controllers/contactControllers');
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");

const router = express.Router();

router.route("/message/new").post(createContact);
router.route("/admin/message").get(isAuthenticatedUser, authorizeRole("admin"), getContactList);


module.exports = router;