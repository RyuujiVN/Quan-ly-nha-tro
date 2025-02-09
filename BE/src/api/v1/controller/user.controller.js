import { StatusCodes } from 'http-status-codes'
import Account from '../../../model/account.model.js'
import bcrypt from 'bcrypt'
import { JwtProvider } from '../../../provider/JwtProvider.js';
import ms from 'ms';

// [POST] /user/register
const register = async (req, res, next) => {
    try {
        const existed = await Account.findOne({
            email: req.body?.email
        });

        if (existed) {
            res.status(StatusCodes.CONFLICT).json({ messsage: "Email bị trùng!" });
            return;
        }

        const newAccount = {
            name: req.body?.name,
            email: req.body?.email,
            password: await bcrypt.hash(req.body?.password, 10)
        }

        await new Account(newAccount).save()
        res.status(StatusCodes.CREATED).json({ message: "Đăng ký thành công!" });

    } catch (error) {
        next(error)
    }
}

// [POST] /user/login
const login = async (req, res, next) => {
    try {
        const user = await Account.findOne({
            $or: [
                {
                    email: req.body.email
                },

                {
                    name: req.body.email
                }
            ]
        })

        // Nếu không tìm thấy tài khoản
        if (!user) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Không tìm thấy tài khoản!"
            })

            return
        }

        const passwordCorrect = await bcrypt.compare(req.body.password, user.password)

        // Nếu mật khẩu sai
        if (!passwordCorrect) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Sai tài khoản hoặc mật khẩu!"
            })

            return
        }

        const userInfo = {
            id: user.id,
            name: user.name,
            email: user.email
        }

        // // Tạo hai cái accessToken và refreshToken
        const accessToken = await JwtProvider.generateToken(
            userInfo,
            process.env.ACCESS_SECRET_SIGNATURE,
            '1h'
            // 5
        )

        const refreshToken = await JwtProvider.generateToken(
            userInfo,
            process.env.REFRESH_SECRET_SIGNATURE,
            '14 days'
            // 15
        )

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: ms("14 days")
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: ms("14 days")
        })

        res.status(StatusCodes.OK).json(userInfo);
    } catch (error) {
        next(error)
    }
}

// [DELETE] /user/logout
const logout = (req, res, next) => {
    try {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        res.status(StatusCodes.OK).json({ message: "Đăng xuất thành công!" })
    } catch (error) {
        next(error)
    }
}

// [POST] /user/refresh-token
const refreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies?.refreshToken;

        // Verify token
        const refreshTokenDecoded = await JwtProvider.verifyToken(refreshToken, process.env.REFRESH_SECRET_SIGNATURE)

        const userInfo = {
            id: refreshTokenDecoded.id,
            name: refreshTokenDecoded.name,
            email: refreshTokenDecoded.email
        }

        // Tạo accessToken mới
        const accessToken = await JwtProvider.generateToken(
            userInfo,
            process.env.ACCESS_SECRET_SIGNATURE,
            '1h'
            // 5
        )

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: ms("14 days")
        })

        res.status(StatusCodes.CREATED).json({ message: "Tạo mới accessToken thành công!" });
    } catch (error) {
        next(error)
    }
}

// [POST] /user/password/forgot
const forgot = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}

const userController = {
    register,
    login,
    logout,
    refreshToken
}

export default userController