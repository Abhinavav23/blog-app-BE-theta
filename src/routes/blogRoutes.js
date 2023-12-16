const express = require("express");
const router = express.Router();
const { createBlog, getAllBlogs, getMyBlogs } = require("../controller/blogController");
const { checkUserLogin } = require("../middlewares/auth");

router.post("/new", checkUserLogin, createBlog);
router.get("/all", getAllBlogs);
router.get("/myblogs", checkUserLogin, getMyBlogs)
module.exports = router
