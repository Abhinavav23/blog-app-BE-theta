const app = require("./app");
const dotEnv = require("dotenv");
dotEnv.config();
require("./connectDb");

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`blog server started at ${PORT}`);
})