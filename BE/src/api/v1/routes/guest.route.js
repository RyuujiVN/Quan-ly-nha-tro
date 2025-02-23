import express from 'express'
import authMiddleware from '../../../middleware/authMiddlware.js';
import guestController from '../controller/guest.controller.js';


const router = express.Router();

router.get("/", authMiddleware.isAuthorized, guestController.get)

router.post("/add", authMiddleware.isAuthorized, guestController.add);

router.patch("/edit/:id", authMiddleware.isAuthorized, guestController.edit);

router.delete("/delete/:id", authMiddleware.isAuthorized, guestController.deleteGuest);

export default router;