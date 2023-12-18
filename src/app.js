const express = require("express");
const app = express();
const cors = require('cors')
const userRouter = require("./routes/userRoute");
const blogRouter = require("./routes/blogRoutes");

app.use(express.json());
app.use(cors());

app.use("/api/auth", userRouter);
app.use("/api/blog", blogRouter);

module.exports = app;
