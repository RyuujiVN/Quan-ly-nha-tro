import { StatusCodes } from 'http-status-codes';
import Joi from 'joi'

const validation = async (req, res, next) => {
  const correctCondition = Joi.object({
    name: Joi.string().required().min(3).trim().strict(),
    price: Joi.number().required().min(3).strict(),
    unit: Joi.string().required().min(3).trim().strict(),
    quantity: Joi.number().allow(null).min(1).strict()
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

const serviceValidation = {
  validation
}

export default serviceValidation