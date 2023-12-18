const Blog = require("../models/blogModel");
const Comment = require("../models/commentModel");
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

const getSingleBlog = async (req, res) => {
  const { blogId } = req.params;
  try {
    const blog = await Blog.findById(blogId).populate({
      path: "comments",
      model: "comments",
    });
    res.status(200).json({ message: "success", details: blog });
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

const updateBlog = async (req, res) => {
  const { blogId } = req.params;
  const { userId } = req; //current user
  // step - 1 find the blog to update
  try {
    const blog = await Blog.findById(blogId);
    const isOwner = blog.user.equals(userId);
    if (isOwner) {
      // update the blog
      await Blog.findByIdAndUpdate(blogId, { $set: req.body });
      res
        .status(200)
        .json({ status: "success", message: "blog updated successfully" });
    } else {
      res.status(400).json({
        status: "failed",
        message: "you are not authorized to update this blog",
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ status: "failed", message: "something went wrong." });
  }
};

const deleteBlog = (req, res) => {};

const addComment = async (req, res) => {
  const { userId } = req;
  const { blogId } = req.params;
  try {
    const comment = await Comment.create({
      ...req.body,
      user: userId,
      blog: blogId,
    });
    await Blog.findByIdAndUpdate(blogId, { $push: { comments: comment._id } });
    res
      .status(200)
      .json({ status: "success", message: "comment added successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ status: "failed", message: "something went wrong." });
  }
};

const addVote = async (req, res) => {
  // get the blogId -> params
  // get the userId --> req
  // get the vote type --> query params
  const { blogId } = req.params;
  const { userId } = req;
  const { voteType } = req.query;

  try {
    // await Blog.findByIdAndUpdate(blogId, { $push: { votedBy: userId }, $inc: {} });
    if(voteType === "upVote"){
        await Blog.findByIdAndUpdate(blogId, { $push: { votedBy: userId }, $inc: {upVote: 1} });
    }else if(voteType === "downVote"){
        await Blog.findByIdAndUpdate(blogId, { $push: { votedBy: userId }, $inc: {downVote: 1} });
    }
    res
      .status(200)
      .json({ status: "success", message: "voted successfully" });

  } catch (err) {
    res
      .status(500)
      .json({ status: "failed", message: "something went wrong." });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  addComment,
  addVote,
};
