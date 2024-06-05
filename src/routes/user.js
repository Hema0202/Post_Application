const router = require("express").Router();
const {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    login,
} = require("../controllerController");

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
router.post("/login", login);

router.post("/create", createUser);

router.use(authentication);
//Protected routes
router.get("/get", getUser);

// router.get("/getAll", getUsers);

router.put("/update", updateUser);

router.delete("/delete", deleteUser);

router.use(authorization);

router.get("/get/:id", getUserProfile);

router.put("/update/:id", updateUserProfile);

router.delete("/delete/:id", deleteUserById);

router.get("/getAllUser", getAllUser);

module.exports = router;
