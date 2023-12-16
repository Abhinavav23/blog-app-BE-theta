const {model, Schema} = require("mongoose");

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 4
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    blogs: [
        {
            type: Schema.Types.ObjectId,
            ref: "Blog"
        }
    ]
})

const User = model("users", UserSchema);

module.exports = User