import { StatusCodes } from 'http-status-codes'
import Account from '../../../model/account.model.js'
import bcrypt from 'bcrypt'
import { JwtProvider } from '../../../provider/JwtProvider.js';
import ms from 'ms';
import { generateNumber } from '../../../helpers/generate.js';
import ForgotPassword from '../../../model/forgot-password.model.js';
import sendEmail from '../../../helpers/sendEmail.js';

// [POST] /user/register
const register = async (req, res, next) => {
    try {
        const existed = await Account.findOne({
            email: req.body?.email
        });

        if (existed) {
            res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ messsage: "Email bị trùng!" });
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
            res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
                message: "Không tìm thấy tài khoản!"
            })

            return
        }

        const passwordCorrect = await bcrypt.compare(req.body.password, user.password)

        // Nếu mật khẩu sai
        if (!passwordCorrect) {
            res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
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
        const user = await Account.findOne({
            email: req.body.email
        })

        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy tài khoản này!" })
            return
        }

        const objectForgotPassword = {
            email: user.email,
            otp: generateNumber(6),
            expireAt: Date.now()
        }

        await ForgotPassword(objectForgotPassword).save()

        const subject = `Mã otp xác minh:`
        const html = `
            Mã otp lấy lại mật khẩu là <b>${objectForgotPassword.otp}</b>.
            Thời hạn sử dụng là 3 phút
        `;

        sendEmail(user.email, subject, html)

        res.status(StatusCodes.OK).json({ email: user.email })
    } catch (error) {
        next(error)
    }
}

// [POST] /user/password/otp
const otp = async (req, res, next) => {
    try {
        const otp = await ForgotPassword.findOne({
            email: req.body.email,
            otp: req.body.otp
        })

        console.log(otp)

        if (!otp) {
            res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: "Nhập sai mã otp hoặc otp đã hết hạn!" })
            return
        }

        res.status(StatusCodes.OK).json({ email: otp.email })
    } catch (error) {
        next(error)
    }
}

// [PATCH] /user/password/reset
const reset = async (req, res, next) => {
    try {
        const { email, password, confirm_password } = req.body

        const user = await Account.findOne({
            email: email
        })

        if (!user) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: "Không tìm thấy tài khoản!" })
            return
        }

        if (password !== confirm_password) {
            res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: "Xác nhận mật khẩu không trùng!" })
            return
        }

        const newPassword = await bcrypt.hash(password, 10);

        await Account.updateOne({ email: email }, {
            password: newPassword
        })

        res.status(StatusCodes.OK).json({ message: "Đổi mật khẩu thành công!" })
    } catch (error) {
        next(error)
    }
}

// [POST] /user/verify
const verify = async (req, res, next) => {
    
}

const userController = {
    register,
    login,
    logout,
    refreshToken,
    forgot,
    otp,
    reset
}

export default userController