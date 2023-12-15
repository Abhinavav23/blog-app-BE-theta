const Blog = require("../models/blogModel");
const User = require("../models/userModel");

const createBlog = async (req, res) => {
  const { title, description, imageUrl, tag } = req.body;
  try {
    const user = await User.findById(req.userId);
    const blog = await Blog.create({
      title,
      description,
      imageUrl,
      tag,
      user: req.userId,
      username: user.username,
    });
    res.status(200).json({ message: "success", details: blog });
  } catch (err) {
    res
      .status(500)
      .json({ status: "failed", message: "something went wrong." });
  }
};

const getAllBlogs = (req, res) => {
    // find
    // select only title, username, upvote, downvote
    // return res or err accordingly
}

module.exports = { createBlog, getAllBlogs };
