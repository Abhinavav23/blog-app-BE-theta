const express = require("express");
const { signup, login, getProfile } = require("../controller/userController");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/profile", getProfile);

module.exports = router;