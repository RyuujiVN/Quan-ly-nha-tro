import { StatusCodes } from 'http-status-codes'
import Service from '../../../model/service.model.js'

// [POST] /service/add
const add = async (req, res) => {
  try {
    await Service(req.body).save()

    res.status(StatusCodes.CREATED).json({
      message: "Thêm thành công!"
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

// [PATCH] /service/edit
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

// [DELETE] /service/edit
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
  add,
  edit,
  deleteService
}

export default serviceController