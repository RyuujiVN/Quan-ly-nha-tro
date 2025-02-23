import { StatusCodes } from 'http-status-codes'
import BoardingHouse from '../../../model/boarding-house.model.js'

// [GET] /boarding-house/
const get = async (req, res, next) => {
  try {
    const data = await BoardingHouse.find({})

    res.status(StatusCodes.OK).json({ data: data })
  } catch (error) {
    next(error)
  }
}

// [POST] /boarding-house/add
const add = async (req, res, next) => {
  try {
    await BoardingHouse(req.body).save();

    res.status(StatusCodes.CREATED).json({
      message: "Thêm thành công!"
    })
  } catch (error) {
    next(error)
  }
}

const boardingHouseController = {
  get,
  add
}

export default boardingHouseController