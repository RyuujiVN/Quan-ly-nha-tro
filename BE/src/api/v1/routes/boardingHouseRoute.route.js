import express from 'express'
import boardingHouseController from '../controller/boardingHouse.controller.js';
import authMiddleware from '../../../middleware/authMiddlware.js';
import multer from 'multer'

const upload = multer({ dest: 'uploads/' })

const router = express.Router();

router.post("/add", authMiddleware.isAuthorized, upload.single('thumbnail'), boardingHouseController.add);

export default router;