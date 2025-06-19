const express = require("express");
const router = express.Router();
const { updateProfile } = require("../controllers/userController");

router.post("/update", updateProfile);

module.exports = router;
