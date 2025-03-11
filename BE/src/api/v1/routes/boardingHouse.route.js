import express from 'express'
import boardingHouseController from '../controller/boardingHouse.controller.js';
import authMiddleware from '../../../middleware/authMiddlware.js';
import multer from 'multer'
import uploadMiddleware from '../../../middleware/uploadMiddleware.js';

const upload = multer()

const router = express.Router();

router.use(authMiddleware.isAuthorized);

router.get("/", boardingHouseController.get);

router.post("/add", upload.single('thumbnail'), uploadMiddleware.uploadCloudinary, boardingHouseController.add);

router.patch("/edit/:id", upload.single('thumbnail'), uploadMiddleware.uploadCloudinary, boardingHouseController.edit);

router.delete("/delete/:id", boardingHouseController.deleteBoardingHouse);

export default router;