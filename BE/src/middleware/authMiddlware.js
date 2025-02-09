import { StatusCodes } from "http-status-codes"
import { JwtProvider } from "../provider/JwtProvider.js"

const isAuthorized = async (req, res, next) => {
    const accessToken = req.cookies?.accessToken

    if (!accessToken) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "Vui lòng đăng nhập!" })
        return
    }

    try {
        // Verify Token
        const accessTokenDecoded = await JwtProvider.verifyToken(accessToken, process.env.ACCESS_SECRET_SIGNATURE);
        req.jwtDecoded = accessTokenDecoded

        next()
    } catch (error) {
        // Nếu accessToken hết hạn
        if (error?.message?.includes("jwt expired")) {
            res.status(StatusCodes.GONE).json({ message: "Cần refresh token!" })
            return;
        }

        // Nếu accessToken bị lỗi hoặc không hợp lệ
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "Vui lòng đăng nhập!" })
    }
}

const authMiddleware = {
    isAuthorized
}

export default authMiddleware