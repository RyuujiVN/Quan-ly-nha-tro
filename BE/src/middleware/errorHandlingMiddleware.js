import { StatusCodes } from 'http-status-codes'

const errorHandlingMiddleware = (err, req, res, next) => {
    // Nếu không có status code thì mặc định là sẽ mã lỗi 500 INTERNAL_SERVER_ERROR
    if (!err.statusCode)
        err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR

    const responseError = {
        statusCode: err.statusCode,
        message: err.message || StatusCodes[err.statusCode],
        stack: err.stack
    }

    console.log(responseError);

    // Trả responseError về phía FE
    res.status(responseError.statusCode).json(responseError)
}

export default errorHandlingMiddleware