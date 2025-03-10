import { StatusCodes } from 'http-status-codes'

const getIncurredCost =  async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({
      id: req.jwtDecoded.id,
      name: req.jwtDecoded.name,
      email: req.jwtDecoded.email
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

const incurredCostController = {
  getIncurredCost
}

export default incurredCostController