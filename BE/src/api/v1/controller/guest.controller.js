import { StatusCodes } from 'http-status-codes'
import Guest from '../../../model/guest.model.js'
import searchHelper from '../../../helpers/searchHelper.js'
import paginationHelper from '../../../helpers/paginationHelper.js'
import Room from '../../../model/room.model.js'


// [GET] /guest/
const get = async (req, res, next) => {
  const find = {}

  // Search
  const search = searchHelper(req.query)

  if (search.regex) {
    find.fullName = search.regex
  }

  // Pagination
  const pagination = paginationHelper(req.query)

  // Status
  if (req.query.status) {
    find.status = req.query.status
  }

  try {
    const guestList = await Guest.find(find)
      .limit(pagination.limitItem)
      .skip(pagination.skipItem)
      .populate("boardingHouseRent", "name")
      .populate("roomRent", "name")

    res.status(StatusCodes.OK).json({ data: guestList })
  } catch (error) {
    next(error)
  }
}


// [POST] /guest/add
const add = async (req, res, next) => {
  try {

    const [guestCard, guestRoom, guestEmail] = await Promise.all([
      Guest.findOne({
        identityCard: req.body.identityCard
      }),

      Guest.findOne({
        roomRent: req.body.roomRent
      }),

      Guest.findOne({
        email: req.body.email
      })

    ])

    if (guestCard || guestEmail) {
      res.status(StatusCodes.CONFLICT).json({
        message: "Khách thuê đã tồn tại!"
      })

      return;
    }

    if (guestRoom) {
      res.status(StatusCodes.CONFLICT).json({
        message: "Phòng này đã có khách thuê!"
      })

      return;
    }

    req.body.birthDate = new Date(req.body.birthDate)
    req.body.dayOfIssue = new Date(req.body.dayOfIssue)
    req.body.rentalDate = new Date(req.body.rentalDate)

    await Room.updateOne({ _id: req.body.roomRent }, {
      status: "Đang thuê"
    })

    await Guest(req.body).save()
    res.status(StatusCodes.CREATED).json({ message: "Thêm thành công!" })
  } catch (error) {
    next(error)
  }
}

// [POST] /guest/edit/:id
const edit = async (req, res, next) => {
  try {
    const id = req.params.id;

    console.log(req.params.id)

    const [guestCard, guestRoom, guestEmail] = await Promise.all([
      Guest.findOne({
        _id: { $ne: id },
        identityCard: req.body.identityCard
      }),

      Guest.findOne({
        _id: { $ne: id },
        roomRent: req.body.roomRent
      }),

      Guest.findOne({
        _id: { $ne: id },
        email: req.body.email
      })

    ])

    if (guestCard || guestEmail) {
      res.status(StatusCodes.CONFLICT).json({
        message: "Khách thuê đã tồn tại!"
      })

      return;
    }

    if (guestRoom) {
      res.status(StatusCodes.CONFLICT).json({
        message: "Phòng này đã có khách thuê!"
      })

      return;
    }

    req.body.birthDate = new Date(req.body.birthDate)
    req.body.dayOfIssue = new Date(req.body.dayOfIssue)
    req.body.rentalDate = new Date(req.body.rentalDate)


    await Guest.updateOne({ _id: id }, req.body);

    res.status(StatusCodes.OK).json({ message: "Cập nhật thành công!" })
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy dữ liệu" })
  }
}

// [POST] /guest/delete/:id
const deleteGuest = async (req, res, next) => {
  try {
    const id = req.params.id;

    await Room.updateOne({ _id: req.body.roomRent }, {
      status: "Còn trống"
    })

    await Guest.deleteOne({ _id: id });

    res.status(StatusCodes.OK).json({ message: "Xoá thành công!" })
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy dữ liệu" })
  }
}

const guestController = {
  get,
  add,
  edit,
  deleteGuest
}

export default guestController