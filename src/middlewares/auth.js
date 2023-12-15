const jwt = require("jsonwebtoken");

const checkUserLogin = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res
      .status(400)
      .json({ status: "failed", message: "Authorization missing" });
  }
  const token = authorization.split(" ")[1];
  try {
    const info = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = info.id
    next();
  } catch (err) {
    res.status(400).json({ status: "failure", message: err.message });
  }
};

module.exports = { checkUserLogin };
