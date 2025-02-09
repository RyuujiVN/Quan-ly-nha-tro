import express from 'express'
import dashboardController from '../controller/dashboard.controller.js';
import authMiddleware from '../../../middleware/authMiddlware.js';

const router = express.Router();

router.get("/", authMiddleware.isAuthorized, dashboardController.access);

export default router;