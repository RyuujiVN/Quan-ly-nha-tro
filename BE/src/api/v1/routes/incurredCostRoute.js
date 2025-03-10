import express from 'express'
import authMiddleware from '../../../middleware/authMiddlware.js';
import incurredCostController from '../controller/incurredCost.controller.js';
import incurredCostValidation from '../../../validation/incurredCostValidation.js';


const router = express.Router();

router.use(authMiddleware.isAuthorized);

router.get("/", incurredCostController.getIncurredCost);

router.post("/add", incurredCostValidation.validation, incurredCostController.addIncurredCost)

router.patch("/edit/:id", incurredCostValidation.validation, incurredCostController.editIncurredCost)

router.delete("/delete/:id", incurredCostController.deleteIncurredCost)

export default router;