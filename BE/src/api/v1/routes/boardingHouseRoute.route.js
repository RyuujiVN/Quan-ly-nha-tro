import express from 'express'
import boardingHouseController from '../controller/boardingHouse.controller.js';
import authMiddleware from '../../../middleware/authMiddlware.js';
import multer from 'multer'
import uploadMiddleware from '../../../middleware/uploadMiddleware.js';

const upload = multer()

const router = express.Router();

router.get("/", authMiddleware.isAuthorized, boardingHouseController.get);

router.post("/add", authMiddleware.isAuthorized, upload.single('thumbnail'), uploadMiddleware.uploadCloudinary, boardingHouseController.add);

export default router;