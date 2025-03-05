import Joi from "joi"
import { StatusCodes } from "http-status-codes"


const validation = async (req, res, next) => {
  // Tạo điều kiện đúng
  const correctCondition = Joi.object({
    name: Joi.string().required().min(3).max(3).trim().strict(),
    thumbnail: Joi.string().allow(""),
    price: Joi.number().required(),
    roomArea: Joi.number().required(),
    status: Joi.string().required().trim().strict(),
    boardingHouseId: Joi.string().required().trim().strict()
  })

  console.log(req.body)

  const data = {
    name: req.body.name,
    roomArea: req.body.roomArea,
    thumbnail: req.body.thumbnail,
    price: req.body.price,
    status: req.body.status,
    boardingHouseId: req.body.boardingHouseId
  }

  // Validate
  try {
    await correctCondition.validateAsync(data, { abortEarly: true })

    next()
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      message: new Error(error).message
    })
  }
}

const roomValidation = {
  validation
}

export default roomValidation