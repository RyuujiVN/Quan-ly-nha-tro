import express from 'express'
import authMiddleware from '../../../middleware/authMiddlware.js';
import incurredCostController from '../controller/incurredCost.controller.js';

const router = express.Router();

router.use(authMiddleware.isAuthorized);

router.get("/", incurredCostController.getIncurredCost);

export default router;