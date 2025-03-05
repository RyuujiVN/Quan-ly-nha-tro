import express from 'express'
import serviceController from '../controller/service.controller.js'
import serviceValidation from '../../../validation/serviceValidation.js';
import authMiddleware from '../../../middleware/authMiddlware.js';

const router = express.Router()

router.use(authMiddleware.isAuthorized)

router.get('/', serviceController.get)

router.post('/add', serviceValidation.validation, serviceController.add)

router.patch('/edit/:id', serviceValidation.validation, serviceController.edit)

router.delete('/delete/:id', serviceController.deleteService)

export default router