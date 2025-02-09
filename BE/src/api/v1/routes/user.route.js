import express from 'express'
import userController from "../controller/user.controller.js";
import userValidate from '../../../../validation/userValidation.js';

const router = express.Router();

router.post("/register", userValidate.registerValidation, userController.register);

router.post("/login", userValidate.loginValidattion, userController.login);

export default router;