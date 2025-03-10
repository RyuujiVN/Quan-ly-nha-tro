import express from 'express'
import authMiddleware from '../../../middleware/authMiddlware.js';
import electricityMeterController from '../controller/electricityMeter.controller.js';

const router = express.Router();

router.use(authMiddleware.isAuthorized)

router.get("/", electricityMeterController.getElectricityMeter);

router.post("/addDelete", electricityMeterController.addDelete);

router.patch("/update/:id", electricityMeterController.updateElectricityMeter);

export default router;