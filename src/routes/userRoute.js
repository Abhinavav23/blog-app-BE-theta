const express = require("express");
const { signup, login, getProfile } = require("../controller/userController");
const { checkUserLogin } = require("../middlewares/auth");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", checkUserLogin, getProfile);

module.exports = router;