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

// [PATCH] /boarding-house/edit
const edit = async (req, res, next) => {
  const id = req.params.id
  try {
    await BoardingHouse.updateOne({ _id: id }, req.body)

    res.status(StatusCodes.OK).json({
      message: "Cập nhật thành công!"
    })
  } catch (error) {
    next(error)
  }
}

// [DELETE] /boarding-house/edit/:id
const deleteBoardingHouse = async (req, res, next) => {
  const id = req.params.id
  try {
    await BoardingHouse.deleteOne({ _id: id })

    res.status(StatusCodes.OK).json({
      message: "Xoá thành công!"
    })
  } catch (error) {
    next(error)
  }
}

const boardingHouseController = {
  get,
  add,
  edit,
  deleteBoardingHouse
}

export default boardingHouseController