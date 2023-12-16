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
    // store the blog info in user -- ref
    await User.findByIdAndUpdate(req.userId, { $push: { blogs: blog._id } });
    res.status(200).json({ message: "success", details: blog });
  } catch (err) {
    res
      .status(500)
      .json({ status: "failed", message: "something went wrong." });
  }
};

const getAllBlogs = async (req, res) => {
  // find
  // select only title, username, upvote, downvote
  // return res or err accordingly
  try {
    const blogList = await Blog.find().select({
      title: 1,
      username: 1,
      upVote: 1,
      downVote: 1,
    });
    res.status(200).json({ message: "success", records: blogList });
  } catch (err) {
    res
      .status(500)
      .json({ status: "failed", message: "something went wrong." });
  }
};

const getMyBlogs = async(req, res) => {
  try {
    const blogs = await User.findById(req.userId).select({blogs: 1});
    res.status(200).json({ message: "success", records: blogs });
  } catch (err) {
    res
      .status(500)
      .json({ status: "failed", message: "something went wrong." });
  }
};

// update the blog --> which blog(route param: blogID), what to update(req.body)
// step - 1 --> check if user is logged in 
// step -2 ---> check if the user is authorised to update the blog
// step -3 --> check if user created the blog and current user are same 

module.exports = { createBlog, getAllBlogs, getMyBlogs };
