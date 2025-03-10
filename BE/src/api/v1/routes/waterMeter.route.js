import express from 'express'
import authMiddleware from '../../../middleware/authMiddlware.js';
import waterMeterController from '../controller/waterMeter.controller.js';

const router = express.Router();

router.use(authMiddleware.isAuthorized)

router.get("/", waterMeterController.getWaterMeter);

router.post("/addDelete", waterMeterController.addDelete);

router.patch("/update/:id", waterMeterController.updateWaterMeter);

export default router;