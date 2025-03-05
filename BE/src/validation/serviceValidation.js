import { StatusCodes } from 'http-status-codes';
import Joi from 'joi'

const validation = async (req, res, next) => {
  const correctCondition = Joi.object({
    name: Joi.string().required().min(3).trim().strict(),
    price: Joi.number().required().min(3).strict(),
    unit: Joi.string().required().min(3).trim().strict(),
    quantity: Joi.number().allow(null).min(1).strict()
  });

  const data = {
    name: req.body.name,
    price: req.body.price,
    unit: req.body.unit,
    quantity: req.body?.quantity
  }

  try {
    await correctCondition.validateAsync(data, { abortEarly: false })

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