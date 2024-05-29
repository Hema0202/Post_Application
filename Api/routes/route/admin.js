const router = require("express").Router();
const {
    getUserProfile,
    updateUserProfile,
    deleteUser,
    getAllUser,
    deleteAnyUser,
} = require("./../controller/adminController");

const { authentication, authorization } = require("./middlewares/auth");

router.use(authentication);

router.use(authorization);

router.get("/user/get/:id", getUserProfile);

router.put("user/udate/:id", updateUserProfile);

router.delete("/user/delete/:id", deleteUser);

router.get("/user/getAllUser", getAllUser);

router.delete("/user/delete", deleteAnyUser);
module.exports = router;
