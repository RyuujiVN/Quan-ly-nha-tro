import { StatusCodes } from 'http-status-codes'
import IncurredCost from '../../../model/incurred-cost.model.js'

// [GET] /api/v1/incurred-cost/
const getIncurredCost = async (req, res) => {

  try {
    const selectedMonth = new Date(req.query?.month || Date.now());

    selectedMonth.setUTCDate(1)  // Đưa về ngày 1 của tháng
    selectedMonth.setUTCHours(0, 0, 0, 0)

    const startMonth = selectedMonth;

    const endMonth = new Date(startMonth);
    endMonth.setMonth(endMonth.getMonth() + 1); // Chuyển sang đầu tháng sau

    const data = await IncurredCost.aggregate([
      {
        $match: {
          month: {
            $gte: startMonth,
            $lt: endMonth
          },
          user: req.jwtDecoded.id
        }
      },
      {
        $lookup: {
          from: "room",
          localField: "roomId",
          foreignField: "_id",
          as: "room_info",
          pipeline: [
            {
              $project: {
                _id: true,
                name: true,
                boardingHouseId: true
              }
            }
          ]
        },
      },

      {
        $unwind: "$room_info"
      },
      {
        $lookup: {
          from: "boarding-house",
          localField: "room_info.boardingHouseId",
          foreignField: "_id",
          as: "boardingHouse_info",
          pipeline: [
            {
              $project: {
                _id: true,
                name: true
              }
            }
          ]
        }
      },

      {
        $unwind: "$boardingHouse_info"
      },
    ])



    res.status(StatusCodes.OK).json({
      data: data
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

// [POST] /api/v1/incurred-cost/add
const addIncurredCost = async (req, res, next) => {

  try {
    await IncurredCost({
      ...req.body,
      user: req.jwtDecoded.id
    }).save();

    res.status(StatusCodes.CREATED).json({
      message: "Thêm thành công!"
    })
  } catch (error) {
    next(error)
  }
}

// [POST] /api/v1/incurred-cost/edit/:id
const editIncurredCost = async (req, res, next) => {

  try {
    const id = req.params.id;

    await IncurredCost.updateOne({ _id: id }, req.body)

    res.status(StatusCodes.OK).json({
      message: "Chỉnh sửa thành công!"
    })
  } catch (error) {
    next(error)
  }
}

// [POST] /api/v1/incurred-cost/edit/:id
const deleteIncurredCost = async (req, res, next) => {

  try {
    const id = req.params.id;

    await IncurredCost.deleteOne({ _id: id })

    res.status(StatusCodes.OK).json({
      message: "Xoá thành công!"
    })
  } catch (error) {
    next(error)
  }
}

const incurredCostController = {
  getIncurredCost,
  addIncurredCost,
  editIncurredCost,
  deleteIncurredCost
}

export default incurredCostController