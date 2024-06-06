const mongoose = require("mongoose");

//Define the post schema
const postSchema = new mongoose.schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        },

        content: {
            type: String,
            required: [true, "Content is required"],
        },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", //Assuming you have user model
            required: [true, "Author is required"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Post", userSchema);
