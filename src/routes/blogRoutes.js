const express = require("express");
const router = express.Router();
const {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  addComment,
  addVote,
} = require("../controller/blogController");
const { checkUserLogin } = require("../middlewares/auth");

router.post("/new", checkUserLogin, createBlog);
router.get("/all", getAllBlogs);
router.get("/single/:blogId", getSingleBlog);
router.patch("/:blogId", checkUserLogin, updateBlog);
router.post("/comment/:blogId", checkUserLogin, addComment);
router.patch("/vote/:blogId", checkUserLogin, addVote);

module.exports = router;
