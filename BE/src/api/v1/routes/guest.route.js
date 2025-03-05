import express from 'express'
import authMiddleware from '../../../middleware/authMiddlware.js';
import guestController from '../controller/guest.controller.js';
import guestValidation from '../../../validation/guestValidation.js';


const router = express.Router();

router.use(authMiddleware.isAuthorized)

router.get("/", guestController.get)

router.post("/add", guestValidation.validation, guestController.add);

router.patch("/edit/:id", guestValidation.validation, guestController.edit);

router.delete("/delete/:id", guestController.deleteGuest);

export default router;