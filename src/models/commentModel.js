const {Schema, model} = require("mongoose");

const CommentSchema = new Schema({
    content: {
        type: String,
        minLength: 6
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: "Blog"
    },
    isNested: Boolean,
    nested: [
        String
    ]
});

const Comment = model("comments", CommentSchema);

module.exports = Comment

