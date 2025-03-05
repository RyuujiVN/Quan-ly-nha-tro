import { StatusCodes } from 'http-status-codes'
import Room from "../../../model/room.model.js"
import searchHelper from '../../../helpers/searchHelper.js'
import paginationHelper from '../../../helpers/paginationHelper.js'

// [GET] /api/v1/room/get
const get = async (req, res) => {
  const { boardingHouseId } = req.query

  const find = {
    boardingHouseId: boardingHouseId
  }

  // Search
  const search = searchHelper(req.query);

  // Pagination
  const pagination = paginationHelper(req.query)

  if (search.regex)
    find.name = search.regex

  try {
    const rooms = await Room.find(find)
      .limit(pagination.limitItem)
      .skip(pagination.skipItem)

    res.status(StatusCodes.OK).json({
      data: rooms
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}


// [POST] /api/v1/room/add
const add = async (req, res) => {
  try {
    const room = await Room.findOne({
      name: req.body.name,
      boardingHouseId: req.body.boardingHouseId
    })

    if (room) {
      res.status(StatusCodes.CONFLICT).json({ message: "Phòng đã tồn tại!" })
      return;
    }
    req.body.price = parseInt(req.body.price)
    req.body.roomArea = parseInt(req.body.roomArea)

    await Room(req.body).save();
    res.status(StatusCodes.CREATED).json({
      message: "Thêm thành công!"
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

// [PATCH] /api/v1/room/edit/:id
const editRoom = async (req, res, next) => {
  try {
    const id = req.params.id;

    await Room.updateOne({ _id: id }, req.body)
    res.status(StatusCodes.OK).json({
      message: "Chỉnh sửa thành công!"
    })
  } catch (error) {

  }
}

// [POST] /api/v1/room/delete/:id
const deleteRoom = async (req, res, next) => {
  try {
    const id = req.params.id;

    await Room.deleteOne({ _id: id });

    res.status(StatusCodes.OK).json({ message: "Xoá thành công!" })
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy dữ liệu" })
  }
}

const roomController = {
  get,
  add,
  editRoom,
  deleteRoom
}

export default roomController