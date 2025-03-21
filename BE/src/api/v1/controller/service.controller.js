import { StatusCodes } from 'http-status-codes'
import Service from '../../../model/service.model.js'
import searchHelper from '../../../helpers/searchHelper.js';

// [GET] /api/v1/service/
const get = async (req, res, next) => {
  const find = {
    user: req.jwtDecoded.id
  }

  // Search
  const search = searchHelper(req.query);

  if (search.regex)
    find.name = search.regex

  try {
    const services = await Service.find(find);

    res.status(StatusCodes.OK).json({
      data: services
    })
  } catch (error) {
    next(error)
  }
}

// [POST] /api/v1/service/add
const add = async (req, res) => {
  try {
    await Service({
      ...req.body,
      user: req.jwtDecoded.id
    }).save()

    res.status(StatusCodes.CREATED).json({
      message: "Thêm thành công!"
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

// [PATCH] /api/v1/service/edit/:id
const edit = async (req, res) => {
  try {
    const id = req.params.id

    await Service.updateOne({ _id: id }, req.body)

    res.status(StatusCodes.OK).json({
      message: "Cập nhật thành công!"
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

// [DELETE] /api/v1/service/delete/:id
const deleteService = async (req, res) => {
  try {
    const id = req.params.id

    await Service.deleteOne({ _id: id })

    res.status(StatusCodes.OK).json({
      message: "Xoá thành công!"
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

const serviceController = {
  get,
  add,
  edit,
  deleteService
}

export default serviceController