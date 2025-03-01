import { StatusCodes } from 'http-status-codes'
import Room from "../../../model/room.model.js"
import searchHelper from '../../../helpers/searchHelper.js'
import paginationHelper from '../../../helpers/paginationHelper.js'

// [GET] /room/get
const get = async (req, res) => {
  const { boardingHouseId } = req.query.boardingHouseId
  const find = {
    boardingHouseId: req.query.boardingHouseId
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
      rooms: rooms
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}


// [POST] /room/add
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

// [POST] /room/delete/:id
const deleteRoom = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id)

    await Room.deleteOne({ _id: id });

    res.status(StatusCodes.OK).json({ message: "Xoá thành công!" })
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy dữ liệu" })
  }
}

const roomController = {
  get,
  add,
  deleteRoom
}

export default roomController