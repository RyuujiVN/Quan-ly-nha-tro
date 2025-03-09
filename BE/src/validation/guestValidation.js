import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const validation = async (req, res, next) => {
  // Tạo điều kiện đúng để validate
  const correctCondition = Joi.object({
    fullName: Joi.string().required().min(5).max(50).trim().strict(),
    birthDate: Joi.date().iso().required(),
    identityCard: Joi.string().required().min(12).max(12).trim().strict(),
    roomRent: Joi.string().required().min(3).trim().strict(),
    status: Joi.string().required().min(5).max(50).trim().strict(),
    phone: Joi.string().required().min(10).max(10).trim().strict(),
    email: Joi.string().required().trim().strict(),
    dayOfIssue: Joi.date().iso().required(),
    rentalDate: Joi.date().iso().required(),
    boardingHouseRent: Joi.string().required().trim().strict(),
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false, allowUnknown: true })

    next()
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      message: new Error(error).message
    })
  }
}

const guestValidation = {
  validation
}

export default guestValidation