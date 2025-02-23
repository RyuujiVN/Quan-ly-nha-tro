import { StatusCodes } from 'http-status-codes'

const add = async (req, res) => {
  console.log(req.file)
  console.log(req.body)
  try {
    res.status(StatusCodes.CREATED).json({
      message: "Thêm thành công!"
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

const boardingHouseController = {
  add
}

export default boardingHouseController