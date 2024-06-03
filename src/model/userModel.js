const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "First name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is requird"],
            min: [6, "Email must be 6 character"],
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "Enter password"],
            select: false,
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
