import express from 'express'
import userController from "../controller/user.controller.js";
import userValidate from '../../../validation/userValidation.js';

const router = express.Router();

router.post("/register", userValidate.registerValidation, userController.register);

router.post("/login", userValidate.loginValidattion, userController.login);

router.delete("/logout", userController.logout);

router.put("/refresh-token", userController.refreshToken);

router.post("/password/forgot", userController.forgot);

router.post("/password/otp", userController.otp);

router.patch("/password/reset", userValidate.resetPasswordValidation, userController.reset);

export default router;