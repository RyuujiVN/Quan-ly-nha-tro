import express from 'express'
import multer from 'multer'
import authMiddleware from '../../../middleware/authMiddlware.js';
import roomController from '../controller/room.controller.js';
import uploadMiddleware from '../../../middleware/uploadMiddleware.js';

const upload = multer()

const router = express.Router();

router.use(authMiddleware.isAuthorized);

router.get("/", roomController.get)

router.post("/add", upload.single("thumbnail"), uploadMiddleware.uploadCloudinary, roomController.add);

router.delete("/delete/:id", roomController.deleteRoom);

export default router;