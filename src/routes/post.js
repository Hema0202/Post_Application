const postRouter = require("express").Router();

postRouter.post("/create");

postRouter.get("/get/:id");

postRouter.get("/getAll");

postRouter.patch("/update/:id");

postRouter.delete("/delete/:id");

module.exports = postRouter;
