const user = require("../model/userModel");

async function getUserProfile(req, res) {
    try {
        const user = await user.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        res.json(user);
    } catch (err) {
        res.status(500).send({
            status: false,
            message: err.message,
        });
    }
}

async function updateUserProfile(req, res) {
    try {
        const user = await user.findByIdAndUpdate(req.params.userId, req.body, {
            new: true,
        });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        res.json(user);
    } catch (err) {
        res.status(500).send({
            status: false,
            message: err.message,
        });
    }
}

async function deleteUserById(req, res) {
    try {
        const user = await user.findByIdAndDelete(req.params.userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).send({
            status: false,
            message: err.message,
        });
    }
}

async function getAllUser(req, res) {
    try {
        const users = await user.find();
        res.json(users);
    } catch (err) {
        res.status(500).send({
            status: false,
            message: err.message,
        });
    }
}

async function deleteAnyUser(req, res) {
    try {
        const user = await user.findByIdAndDelete(req.params.userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
            res.json({
                message: "User deleted successfully",
            });
        }
    } catch (err) {
        res.status(500).send({
            status: false,
            message: err.message,
        });
    }
}

module.exports = {
    getUserProfile,
    updateUserProfile,
    deleteUserById,
    getAllUser,
};
