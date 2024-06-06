const postRouter = require("express").Router();
const {
    createPost,
    getPostById,
    getAllPosts,
    updatePost,
    deletePost,
} = require("./../controller/postController");

const postAutorization = require("./../middlewares/auth");

postRouter.post("/create", createPost);

postRouter.get("/get/:id", getPostById);

postRouter.get("/getAll", getAllPosts);

postRouter.patch("/update/:id", postAutorization, updatePost);

postRouter.delete("/delete/:id", postAutorization, deletePost);

module.exports = postRouter;
