const router = require("express").Router();
const {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    login,
} = require("../controller/userController");

const {
    getUserProfile,
    updateUserProfile,
    deleteUserById,
    getAllUser,
} = require("../controller/adminController");

const { authentication, authorization } = require("../middlewares/auth");

function testHandler(req, res) {
    res.send("everything working fine");
}

router.get("/test", testHandler);

//Public routes
router.post("/user/login", login);

router.post("/user/create", createUser);

router.use(authentication);
//Protected routes
router.get("/user/get", getUser);

// router.get("/user/getAll", getUsers);

router.put("/user/update", updateUser);

router.delete("/user/delete", deleteUser);

router.use(authorization);

router.get("/user/get/:id", getUserProfile);

router.put("user/udate/:id", updateUserProfile);

router.delete("/user/delete/:id", deleteUserById);

router.get("/user/getAllUser", getAllUser);

module.exports = router;
