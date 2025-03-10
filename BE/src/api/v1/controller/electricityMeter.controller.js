import { StatusCodes } from 'http-status-codes'
import ElectricityMeter from '../../../model/electricity-meter.model.js'
import Room from '../../../model/room.model.js'
import Service from '../../../model/service.model.js'

// [GET] /api/v1/electricity-meter/
const getElectricityMeter = async (req, res, next) => {
  const selectedMonth = new Date(req.query?.month || Date.now())

  selectedMonth.setUTCDate(1); // Đưa về ngày 1 của tháng
  selectedMonth.setUTCHours(0, 0, 0, 0);

  const startOfMonth = selectedMonth;

  const endOfMonth = new Date(startOfMonth);
  endOfMonth.setMonth(endOfMonth.getMonth() + 1); // Chuyển sang đầu tháng sau

  try {

    const data = await ElectricityMeter.aggregate([
      {
        $match: {
          time: {
            $gte: startOfMonth,
            $lt: endOfMonth
          }
        }
      },

      {
        $lookup: {
          from: "room",
          localField: "room",
          foreignField: "_id",
          as: "room_info"
        }
      },

      {
        $unwind: "$room_info"
      },

      {
        $lookup: {
          from: "boarding-house",
          localField: "room_info.boardingHouseId",
          foreignField: "_id",
          as: "boardingHouse_info"
        }
      },

      {
        $unwind: "$boardingHouse_info"
      },

      {
        $project: {
          _id: true,
          time: true,
          old: true,
          new: true,
          "room_info.name": true,
          "room_info._id": true,
          "boardingHouse_info.name": true
        }
      }
    ])

    res.status(StatusCodes.OK).json({
      data: data
    })

  } catch (error) {
    next(error)
  }
}

// [POST] /api/v1/electricity-meter/addDelete
const addDelete = async (req, res, next) => {
  try {
    const room = await Room.findOne({
      _id: req.body.room
    })

    const electricity = new RegExp("Điện", "i");

    const service = await Service.findOne({
      _id: {
        $in: room.service_id
      },
      name: electricity
    })

    if (service) {
      const startOfMonth = new Date()
      startOfMonth.setUTCDate(1); // Đưa về ngày 1 của tháng
      startOfMonth.setUTCHours(0, 0, 0, 0);

      const endOfMonth = new Date(startOfMonth);
      endOfMonth.setMonth(endOfMonth.getMonth() + 1); // Chuyển sang đầu tháng sau

      const [existed, monthPrev] = await Promise.all([
        await ElectricityMeter.findOne({
          room: req.body.room,
          time: {
            $gte: startOfMonth,
            $lt: endOfMonth
          }
        }),

        await ElectricityMeter.findOne({
          room: req.body.room,
          time: {
            $lt: startOfMonth
          }
        })
      ])

      if (!existed && !monthPrev) {
        await new ElectricityMeter({ room: req.body.room }).save();
      }
      else if (monthPrev) {
        await new ElectricityMeter({
          room: req.body.room,
          old: monthPrev.new
        }).save()
      }
    }

    res.status(StatusCodes.OK).json({
      message: "Cập nhật thành công"
    })

  } catch (error) {
    next(error)
  }
}

// [PATCH] /api/v1/electricity-meter/update/:id
const updateElectricityMeter = async (req, res, next) => {
  try {
    const id = req.params.id;
    const startMonth = new Date(req.body.time);
    const endMonth = new Date(startMonth);
    endMonth.setMonth(endMonth.getMonth() + 1)

    // Cập nhật tháng này
    await ElectricityMeter.updateOne({ _id: id }, req.body)

    // Tìm tháng trước gần nhất
    const electricityMeterPrev = await ElectricityMeter.findOne({
      room: req.body.room,
      time: {
        $lt: startMonth
      }
    }).sort({ time: -1 })

    console.log(electricityMeterPrev)

    // Nếu có thì cập nhật chỉ số mới bằng chỉ số cũ của tháng hiện tại
    if (electricityMeterPrev) {
      electricityMeterPrev.new = req.body.old
      await electricityMeterPrev.save();
    }

    // Tìm tháng sau gần nhất
    const electricityMeterNext = await ElectricityMeter.findOne({
      room: req.body.room,
      time: {
        $gte: endMonth
      }
    }).sort({ time: 1 })

    // Nếu có thì cập nhật chỉ số cũ bằng chỉ số mới của tháng hiện tại
    if (electricityMeterNext) {
      electricityMeterNext.old = req.body.new
      await electricityMeterNext.save();
    }
    else {
      await new ElectricityMeter({
        room: req.body.room,
        old: req.body.new,
        time: endMonth,
      }).save()
    }

    res.status(StatusCodes.OK).json({
      message: "cập nhật thành công!"
    })
  } catch (error) {
    next(error)
  }
}

const electricityMeterController = {
  getElectricityMeter,
  updateElectricityMeter,
  addDelete
}

export default electricityMeterController
