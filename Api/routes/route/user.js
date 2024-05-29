const router = require("express").Router();
const {
    createUser,
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
    login,
} = require("./controller/userController");

const { authentication, authorization } = require("./middlewares/auth");

function testHandler(req, res) {
    res.send("everything working fine");
}

router.get("/test", testHandler);

//Public routes
router.post("/user/login", login);

router.post("/user/create", authentication, createUser);

router.use(authentication);
//Protected routes
router.get("/user/get/:id", getUserById);

// router.get("/user/getAll", getUsers);

router.put("/user/update/:id", updateUser);

router.delete("/user/delete/:id", deleteUser);

module.exports = router;
