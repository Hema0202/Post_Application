const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "First name is required"],
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            requird: true,
        },
        password: {
            type: String,
            required: [true, "enter password"],
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
