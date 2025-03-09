import { StatusCodes } from 'http-status-codes'
import BoardingHouse from '../../../model/boarding-house.model.js'
import Room from '../../../model/room.model.js'
import searchHelper from '../../../helpers/searchHelper.js'

// [GET] /boarding-house/
const get = async (req, res, next) => {
  const find = {
    user_id: req.jwtDecoded.id
  }

  try {
    const search = searchHelper(req.query);

    if (search.regex) {
      find.name = search.regex
    }

    const data = await BoardingHouse.find(find)

    res.status(StatusCodes.OK).json({ data: data })
  } catch (error) {
    next(error)
  }
}

// [POST] /boarding-house/add
const add = async (req, res, next) => {
  try {
    req.body.user_id = req.jwtDecoded.id;

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

    await Room.deleteMany({ boardingHouseId: id })

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