import { StatusCodes } from 'http-status-codes'
import WaterMeter from '../../../model/water-meter.model.js'
import Room from '../../../model/room.model.js'
import Service from '../../../model/service.model.js'

// [GET] /api/v1/water-meter/
const getWaterMeter = async (req, res, next) => {
  const selectedMonth = new Date(req.query?.month || Date.now())

  selectedMonth.setUTCDate(1); // Đưa về ngày 1 của tháng
  selectedMonth.setUTCHours(0, 0, 0, 0);

  const startOfMonth = selectedMonth;

  const endOfMonth = new Date(startOfMonth);
  endOfMonth.setMonth(endOfMonth.getMonth() + 1); // Chuyển sang đầu tháng sau

  try {

    const data = await WaterMeter.aggregate([
      {
        $match: {
          time: {
            $gte: startOfMonth,
            $lt: endOfMonth
          },
          user: req.jwtDecoded.id
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

// [POST] /api/v1/water-meter/addDelete
const addDelete = async (req, res, next) => {
  try {
    const room = await Room.findOne({
      _id: req.body.room
    })

    const water = new RegExp("Nước", "i");

    const service = await Service.findOne({
      _id: {
        $in: room.service_id
      },
      name: water
    })

    if (service) {
      const startOfMonth = new Date()
      startOfMonth.setUTCDate(1); // Đưa về ngày 1 của tháng
      startOfMonth.setUTCHours(0, 0, 0, 0);

      const endOfMonth = new Date(startOfMonth);
      endOfMonth.setMonth(endOfMonth.getMonth() + 1); // Chuyển sang đầu tháng sau

      const [existed, monthPrev] = await Promise.all([
        await WaterMeter.findOne({
          room: req.body.room,
          time: {
            $gte: startOfMonth,
            $lt: endOfMonth
          }
        }),

        await WaterMeter.findOne({
          room: req.body.room,
          time: {
            $lt: startOfMonth
          }
        })
      ])

      if (!existed && !monthPrev) {
        await new WaterMeter({ room: req.body.room, user: req.jwtDecoded.id }).save();
      }
      else if (monthPrev) {
        await new WaterMeter({
          room: req.body.room,
          old: monthPrev.new,
          user: req.jwtDecoded.id
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

// [PATCH] /api/v1/water-meter/update/:id
const updateWaterMeter = async (req, res, next) => {
  try {
    const id = req.params.id;
    const startMonth = new Date(req.body.time);
    const endMonth = new Date(startMonth);
    endMonth.setMonth(endMonth.getMonth() + 1)

    // Cập nhật tháng này
    await WaterMeter.updateOne({ _id: id }, req.body)

    // Tìm tháng trước gần nhất
    const waterMeterPrev = await WaterMeter.findOne({
      room: req.body.room,
      time: {
        $lt: startMonth
      }
    }).sort({ time: -1 })

    // Nếu có thì cập nhật chỉ số mới bằng chỉ số cũ của tháng hiện tại
    if (waterMeterPrev) {
      waterMeterPrev.new = req.body.old
      await waterMeterPrev.save();
    }

    // Tìm tháng sau gần nhất
    const waterMeterNext = await WaterMeter.findOne({
      room: req.body.room,
      time: {
        $gte: endMonth
      }
    }).sort({ time: 1 })

    // Nếu có thì cập nhật chỉ số cũ bằng chỉ số mới của tháng hiện tại
    if (waterMeterNext) {
      waterMeterNext.old = req.body.new
      await waterMeterNext.save();
    }
    else {
      await new WaterMeter({
        room: req.body.room,
        old: req.body.new,
        new: req.body.new,
        time: endMonth,
        user: req.jwtDecoded.id
      }).save()
    }

    res.status(StatusCodes.OK).json({
      message: "cập nhật thành công!"
    })
  } catch (error) {
    next(error)
  }
}

const waterMeterController = {
  getWaterMeter,
  updateWaterMeter,
  addDelete
}

export default waterMeterController
