import { StatusCodes } from 'http-status-codes';
import Joi from 'joi'

const validation = async (req, res, next) => {
  const correctCondition = Joi.object({
    month: Joi.date().required().iso(3),
    price: Joi.number().required().min(0).strict(),
    payBy: Joi.string().required().min(3).trim().strict(),
    description: Joi.string().allow(null).max(250).strict()
  });

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false, allowUnknown: true })

    next()
  } catch (error) {
    console.log(new Error(error).message)
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      message: new Error(error).message
    })
  }
}

const incurredCostValidation = {
  validation
}

export default incurredCostValidation