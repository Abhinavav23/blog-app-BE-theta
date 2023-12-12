const {connect} = require("mongoose");

connect(process.env.DB_URL)
.then(() => {
    console.log("Connection to database successful");
})
.catch((err) => {
    console.log(`database connection failed: ${err.message}`);
})