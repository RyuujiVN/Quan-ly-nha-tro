import { StatusCodes } from 'http-status-codes'

const access = async (req, res) => {
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

const dashboardController = {
  access
}

export default dashboardController