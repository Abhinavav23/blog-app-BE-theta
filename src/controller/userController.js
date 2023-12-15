const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    const user = await User.create({ email, username, password: hashedPwd });
    res.status(201).json({ status: "successful", message: "user created" });
  } catch (err) {
    res
      .status(500)
      .json({ status: "failed", message: "something went wrong!!" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ status: "failed", message: "User not found!!" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ status: "failed", message: "incorrect password!!" });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );
    res.status(200).json({ message: "login successful", token });
  } catch (err) {
    res
      .status(500)
      .json({ status: "failed", message: "something went wrong." });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.status(200).json({ message: "success", details: user });
  } catch (err) {
    res
      .status(500)
      .json({ status: "failed", message: "something went wrong." });
  }
};

module.exports = { signup, login, getProfile };
