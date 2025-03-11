import express from 'express'
import authMiddleware from '../../../middleware/authMiddlware.js';
import invoiceController from '../controller/invoice.controller.js';

const router = express.Router();

router.use(authMiddleware.isAuthorized);

router.get("/", invoiceController.getInvoice)

router.post("/create", invoiceController.createInvoice);

router.delete("/delete/:id", invoiceController.deleteInvoice);

export default router;