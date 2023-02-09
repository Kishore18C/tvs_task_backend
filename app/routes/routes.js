import express from "express";

import * as userController from "../controller/user-controller.js";
import * as authController from "../controller/auth-controller.js";

const router = express.Router();

// User
router.get("/user/:id", userController.getUser);
router.post("/verifyuser", userController.verifyUser);
router.post("/user", userController.createUser);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);
router.post("/resendotp", userController.resendOtp);
router.post("/forgotpassword", authController.forgotPassword);
router.post("/verifypasswordotp", authController.verifyPasswordOtp);
router.post("/updatepassword", authController.updatePassword);
// router.post("/userdetails", userController.createUserDetails);

//User Login
router.post("/auth", authController.loginUser);

export default router;
