import jwt from 'jsonwebtoken'

// Hàm tạo token mới
const generateToken = async (payload, secretSignature, tokenLife) => {
    try {
        return await jwt.sign(payload, secretSignature, {algorithm: 'HS256', expiresIn: tokenLife})
    } catch (error) {
        throw new Error(error)
    }
}

// Hàm verify token
const verifyToken = async (token, secretSignature) => {
    try {
        return await jwt.verify(token, secretSignature)
    } catch (error) {
        throw new Error(error)
    }
}

export const JwtProvider = {
    generateToken,
    verifyToken
}