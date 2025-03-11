import { StatusCodes } from 'http-status-codes'
import Room from '../../../model/room.model.js';
import UtilityReading from '../../../model/utility-reading.model.js';
import Invoice from '../../../model/invoice.model.js';

// [GET] /api/v1/invoice/
const getInvoice = async (req, res, next) => {
  const selectedMonth = new Date(req.query?.month || Date.now());

  selectedMonth.setUTCDate(1) // Đưa về ngày đầu tháng
  selectedMonth.setUTCHours(0, 0, 0, 0);

  const startMonth = selectedMonth

  const endMonth = new Date(startMonth)

  endMonth.setMonth(endMonth.getMonth() + 1);
  try {
    const data = await Invoice.aggregate([
      {
        $match: {
          month: {
            $gte: startMonth,
            $lt: endMonth
          },
          user: req.jwtDecoded.id
        },
      },

      {
        $lookup: {
          from: "room",
          localField: "roomId",
          foreignField: "_id",
          as: "room",
          pipeline: [
            {
              $project: {
                _id: true,
                name: true,
                price: true,
                service_id: true,
                boardingHouseId: true
              }
            },
            {
              $set: {
                service_id: {
                  $map: {
                    input: "$service_id",
                    as: "id",
                    in: {
                      $toObjectId: "$$id"
                    }
                  }
                }
              },
            },
          ]
        }
      },

      {
        $unwind: "$room"
      },

      {
        $lookup: {
          from: "boarding-house",
          localField: "room.boardingHouseId",
          foreignField: "_id",
          as: "boardingHouse",
          pipeline: [
            {
              $project: {
                name: true,
                address: true
              }
            }
          ]
        }
      },

      {
        $unwind: "$boardingHouse"
      },

      {
        $lookup: {
          from: "incurred-cost",
          localField: "incurredCostId",
          foreignField: "_id",
          as: "incurredCosts",
          pipeline: [
            {
              $project: {
                payBy: true,
                price: true,
                description: true
              }
            }
          ]
        }
      },

      {
        $lookup: {
          from: "guest",
          localField: "guestId",
          foreignField: "_id",
          as: "guest",
          pipeline: [
            {
              $project: {
                fullName: true,
              }
            }
          ]
        }
      },

      {
        $unwind: "$guest"
      },

      {
        $lookup: {
          from: "utility-reading",
          localField: "electricityMeterId",
          foreignField: "_id",
          as: "electricity",
          pipeline: [
            {
              $project: {
                old: true,
                new: true
              }
            }
          ]
        }
      },

      {
        $unwind: "$electricity"
      },

      {
        $lookup: {
          from: "utility-reading",
          localField: "waterMeterId",
          foreignField: "_id",
          as: "water",
          pipeline: [
            {
              $project: {
                old: true,
                new: true
              }
            }
          ]
        }
      },

      {
        $unwind: "$water"
      },

      {
        $lookup: {
          from: "service",
          localField: "room.service_id",
          foreignField: "_id",
          as: "services",
          pipeline: [
            {
              $project: {
                name: true,
                price: true,
                quantity: true
              }
            }
          ]
        }
      },

      {
        $project: {
          _id: true,
          room: true,
          boardingHouse: true,
          guest: true,
          incurredCosts: true,
          electricity: true,
          water: true,
          services: true,
          totalCost: true,
          status: true,
          paid: true,
          month: true
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

// [GET] /api/v1/invoice/add
const createInvoice = async (req, res, next) => {
  try {
    const selectedMonth = new Date(req.body.month);

    selectedMonth.getUTCDate(1) // Đưa về ngày đầu tháng
    selectedMonth.getUTCHours(0, 0, 0, 0)

    const startMonth = selectedMonth

    const endMonth = new Date(startMonth)

    endMonth.setMonth(endMonth.getMonth() + 1);

    // Lấy tất cả các phòng đang thuê
    const data = await Room.aggregate([
      {
        $match: {
          status: "Đang thuê",
          user: req.jwtDecoded.id
        },
      },
      // Đổi mảng id string thành mảng id object
      {
        $set: {
          service_id: {
            $map: {
              input: "$service_id",
              as: "id",
              in: {
                $toObjectId: "$$id"
              }
            }
          }
        },
      },
      // Lấy thông tin khách
      {
        $lookup: {
          from: "guest",
          localField: "_id",
          foreignField: "roomRent",
          as: "guest",
          pipeline: [
            {
              $project: {
                _id: true,
                fullName: true
              }
            },
          ]
        }
      },

      {
        $unwind: "$guest"
      },
      // Lấy các service mà phòng đó dùng
      {
        $lookup: {
          from: "service",
          localField: "service_id",
          foreignField: "_id",
          as: "services",
          pipeline: [
            {
              $project: {
                price: true,
                quantity: true,
                name: true
              }
            }
          ]
        }
      },
      // Lấy các chi phí phát sinh 
      {
        $lookup: {
          from: "incurred-cost",
          localField: "_id",
          foreignField: "roomId",
          as: "incurredCost",
          pipeline: [
            {
              $match: {
                month: {
                  $gte: startMonth,
                  $lt: endMonth
                }
              },
            },
            {
              $project: {
                _id: true,
                price: true,
              }
            }
          ]
        }
      },
      // Lấy chỉ số điện
      {
        $lookup: {
          from: "utility-reading",
          localField: "_id",
          foreignField: "room",
          as: "electricity",
          pipeline: [
            {
              $match: {
                time: {
                  $gte: startMonth,
                  $lt: endMonth
                },
                type: 'electricity-meter'
              }
            },

            {
              $project: {
                old: true,
                new: true
              }
            }
          ]
        }
      },

      {
        $unwind: "$electricity"
      },
      // Lấy chỉ số nước
      {
        $lookup: {
          from: "utility-reading",
          localField: "_id",
          foreignField: "room",
          as: "water",
          pipeline: [
            {
              $match: {
                time: {
                  $gte: startMonth,
                  $lt: endMonth
                },
                type: "water-meter"
              }
            },

            {
              $project: {
                old: true,
                new: true
              }
            }
          ]
        }
      },

      {
        $unwind: "$water"
      },

      {
        $project: {
          _id: true,
          name: true,
          price: true,
          guest: true,
          services: true,
          incurredCost: true,
          electricity: true,
          water: true
        }

      }
    ])

    const newList = await Promise.all(
      data.map(async (room) => {
        // Tính tổng tiền service
        const totalServiceCost = room.services.reduce((total, item) => {
          if (item.name == "Điện") {
            const price = (room?.electricity?.new - room?.electricity?.old) * item.price
            total = total + price
          }
          else if (item.name == "Nước") {
            const price = (room?.water?.new - room?.water?.old) * item.price
            total = total + price
          }
          else {
            total = total + item.price * item.quantity
          }

          return total
        }, 0)

        // Tính tổng tiền phát sinh
        const totalIncurredCost = room.incurredCost.reduce((total, item) => total + item.price, 0)

        const incuredCostArray = room.incurredCost.map((item) => item._id)

        const totalCost = totalServiceCost + totalIncurredCost + room.price;

        const object = {
          roomId: room._id,
          guestId: room.guest._id,
          incurredCostId: incuredCostArray,
          totalCost: totalCost,
          electricityMeterId: room.electricity._id,
          waterMeterId: room.water._id,
          user: req.jwtDecoded.id
        }

        await new Invoice(object).save()

        return room;
      })
    )

    res.status(StatusCodes.OK).json({
      message: "Tạo hoá đơn thành công!"
    })
  } catch (error) {
    next(error)
  }
}

// [DELETE] api/v1/invoice/delete/:id
const deleteInvoice = async (req, res, next) => {
  try {
    const id = req.params.id;

    await Invoice.deleteOne({ _id: id })

    res.status(StatusCodes.OK).json({
      message: "Xoá thành công!"
    })
  } catch (error) {
    next(error)
  }
}


const invoiceController = {
  createInvoice,
  getInvoice,
  deleteInvoice
}

export default invoiceController