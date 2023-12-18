const express = require("express");
const { signup, login, getProfile, getMyBlogs } = require("../controller/userController");
const { checkUserLogin } = require("../middlewares/auth");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", checkUserLogin, getProfile);
router.get("/myblogs", checkUserLogin, getMyBlogs);

module.exports = router;