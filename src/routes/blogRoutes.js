const express = require("express");
const router = express.Router();
const { createBlog, getAllBlogs } = require("../controller/blogController");
const { checkUserLogin } = require("../middlewares/auth");

router.post("/new", checkUserLogin, createBlog);
router.get("/all", getAllBlogs);
module.exports = router
