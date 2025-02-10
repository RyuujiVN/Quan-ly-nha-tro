import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import e from 'express'

const registerValidation = async (req, res, next) => {
    // Tạo những điều kiện để validate
    const correctCondition = Joi.object({
        name: Joi.string().required().min(3).max(30).trim().strict(),
        email: Joi.string().required().min(3).max(256).trim().strict(),
        password: Joi.string().required().min(3).trim().strict(),
    })

    // Validate dữ liệu được gửi từ FE
    try {
        await correctCondition.validateAsync(req.body, { abortEarly: false })

        next()
    } catch (error) {
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            message: new Error(error).message
        })
    }
}

const loginValidattion = async (req, res, next) => {
    // Tạo những điều kiện để validate
    const correctCondition = Joi.object({
        email: Joi.string().required().min(3).trim().strict(),
        password: Joi.string().required().min(3).trim().strict()
    })

    // Validate dữ liệu được gửi từ FE
    try {
        await correctCondition.validateAsync(req.body, { abortEarly: true })

        next()
    } catch (error) {
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            message: new Error(error).message
        })
    }
}

const resetPasswordValidation = async (req, res, next) => {
    // Tạo những điều kiện để validate
    const correctCondition = Joi.object({
        email: Joi.string().required().min(3).max(30).trim().strict(),
        password: Joi.string().required().min(3).max(30).trim().strict(),
        confirm_password: Joi.string().required().min(3).max(30).trim().strict(),
    })

    // validate dữ liệu
    try {
        await correctCondition.validateAsync(req.body, { abortEarly: true })

        next()
    } catch (error) {
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            message: new Error(error).message
        })
    }
}

const userValidate = {
    registerValidation,
    loginValidattion,
    resetPasswordValidation
}

export default userValidate