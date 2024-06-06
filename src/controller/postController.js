const postModel = require("./../model/postModel");
const userModel = require("./../model/userModel");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

async function createPost(req, res) {
    try {
        let data = req.body;

        //Validate required fields
        if (!data.title || !data.content || !data.author) {
            return res.status(400).send({
                status: false,
                message: "Title, content and author are required",
            });
        }

        //Check if author is a valid objectId and exists
        if (!objectId.isValid(data.author)) {
            return res.status(400).send({
                status: false,
                message: "Invalid author ID",
            });
        }

        const authorExists = await userModel.findById(data.author);
        if (!authorExists) {
            return res.status(400).send({
                status: false,
                message: "Author does not exist",
            });
        }

        //Create the post and save it to the database
        const newPost = await postModel.create(data);

        return res.status(201).send({
            status: true,
            message: "Post created successfully",
            post: {
                id: newPost._id,
                title: newPost.title,
                content: newPost.content,
                author: newPost.author,
                createdAt: newPost.createdAt,
                updatedAt: newPost.updatedAt,
            },
        });
    } catch (err) {
        res.status(500).send({
            status: false,
            message: err.message,
        });
    }
}

async function getPostById(req, res) {
    try {
        const postId = req.params.id;

        if (!objectId.isValid(postId)) {
            return res.status(400).send({
                status: false,
                message: "Invalid post ID",
            });
        }

        const post = await postModel
            .findById(postId)
            .populate("author", "name email");

        if (!post) {
            return res.status(404).send({
                status: false,
                message: "Post not found",
            });
        }

        return res.status(200).send({
            status: true,
            post: {
                id: post._id,
                title: post.title,
                content: post.content,
                author: post.author,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
            },
        });
    } catch (err) {
        res.status(500).send({
            status: false,
            message: err.message,
        });
    }
}

async function getAllPosts(req, res) {
    try {
        const posts = await postModel.find().populate("author", "name email");

        return res.status(200).send({
            status: true,
            posts: posts.map((post) => ({
                id: post._id,
                title: post.title,
                content: post.content,
                author: post.author,
                createdAt: post.createdAt,
                updatedAt: post.udatedAt,
            })),
        });
    } catch (err) {
        res.status(500).send({
            status: false,
            message: err.message,
        });
    }
}

async function updatePost(req, res) {
    try {
        const postId = req.params.id;
        const data = req.body;

        //Only allow updating title and content
        const updateFields = {};
        if (data.title) updateFields.title = data.title;
        if (data.content) updateFields.content = data.content;

        const updatedPost = await postModel
            .findByIdAndUpdate(
                postId,
                { $set: updateFields },
                { new: true, runValidator: true }
            )
            .populate("author", "name email");

        if (!updatedPost) {
            return res.status(404).send({
                status: false,
                message: "Post not found",
            });
        }

        return res.status(200).send({
            status: true,
            message: "Post updated successfully",
            post: {
                id: updatedPost._id,
                title: updatedPost.title,
                content: updatedPost.content,
                author: updatedPost.author,
                createdAt: updatedPost.createdAt,
                updatedAt: updatedPost.updatedAt,
            },
        });
    } catch (err) {
        res.status(500).send({
            status: false,
            message: err.message,
        });
    }
}

async function deletePost(req, res) {
    try {
        const postId = req.params.id;

        const deletedPost = await postModel.findByIdAndUpdate(postId);

        if (!deletedPost) {
            return res.status(404).send({
                status: false,
                message: "Post not found",
            });
        }

        return res.status(200).send({
            status: true,
            message: "Post deleted successfully",
        });
    } catch (err) {
        res.status(500).send({
            status: false,
            message: err.message,
        });
    }
}

module.exports = {
    createPost,
    getPostById,
    getAllPosts,
    updatePost,
    deletePost,
};
