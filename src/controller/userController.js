const userModel = require("./../model/userModel");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const jwt = require("jsonwebtoken");
const validator = require("validator");

async function createUser(req, res) {
    try {
        let data = req.body;

        //Store in database
        const user = await userModel.create(data);

        //Hash the password
        const hash = await bcrypt.hash(data.password, 10);
        user.password = hash;
        user.save();

        return res.status(201).send({
            status: true,
            message: "Your profile is created successfully",
        });
    } catch (err) {
        console.log(err.name);
        if (err.name == "ValidationError")
            return res.status(400).send({
                status: false,
                message: err.message,
            });
        else if (err.code === 11000) {
            // Unique constraint error
            const field = Object.keys(err.keyValue)[0];
            return res.status(400).send({
                status: false,
                message: `${field} must be unique. ${field} "${err.keyValue[field]}" already exists.`,
            });
        }
        res.status(500).send({
            status: false,
            message: err.message,
        });
    }
}

async function getUser(req, res) {
    try {
        let email = req.user.email;

        let user = await userModel.findOne({ email }).select({
            name: 1,
            email: 1,
        });

        if (!user)
            return res.status(404).send({
                status: false,
                message: "User not found",
            });

        return res.status(200).send({
            status: true,
            data: user,
        });
    } catch (err) {
        res.status(500).send({
            status: false,
            message: err.message,
        });
    }
}

async function updateUser(req, res) {
    try {
        // Take user id and data to update
        let email = req.user.email;

        //Extract the data to update from the request body
        let { name } = req.body;

        //Check if the 'name' field is provided
        if (!name) {
            return res.status(400).send({
                status: false,
                message: "Please provide a name to update",
            });
        }

        // update in database;
        let updatedUser = await userModel.findOneAndUpdate(
            {
                email: email,
            },
            {
                name: name,
            },
            {
                new: true,
            }
        );

        return res.status(200).send({
            status: true,
            message: "Updated Successfully",
            data: updatedUser,
        });
    } catch (err) {
        res.status(500).send({
            status: false,
            message: err.message,
        });
    }
}

async function deleteUser(req, res) {
    try {
        //Take user id
        let email = req.user.email;
        console.log(email);

        let user = await userModel.findOneAndUpdate(
            {
                email: email,
            },
            {
                isDeleted: true,
            },
            {
                new: true,
            }
        );

        if (!user)
            return res.status(400).send({
                status: false,
                message: "User not found",
            });

        return res.status(200).send({
            status: true,
            message: "User has been deleted successfully.",
        });
    } catch (err) {
        res.status(500).send({
            status: false,
            message: err.message,
        });
    }
}

async function login(req, res) {
    try {
        let data = req.body;
        let email = data.email;
        let password = data.password;

        if (!email)
            return res.status(400).send({
                status: false,
                message: "Please enter email",
            });

        if (!password)
            return res.send({
                status: false,
                message: "Please enter password",
            });

        // Find any user is available with this email
        const user = await userModel
            .findOne({
                email: email,
            })
            .select("+password");
        console.log(user);

        if (!user) {
            return res.status(404).send({
                status: false,
                message: `${email} is not registered!`,
            });
        }

        //Match the password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword)
            return res.status(400).send({
                status: false,
                message: "Password is incorrect",
            });

        const token = jwt.sign(
            {
                email: user.email,
                name: user.name,
            },
            process.env.SECRET_KEY,
            {
                expiresIn: "1h",
            }
        );

        res.send({
            status: true,
            message: "You are logged in!",
            token: token,
        });
    } catch (err) {
        res.status(500).send({
            status: false,
            message: err.message,
        });
    }
}

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    login,
};
