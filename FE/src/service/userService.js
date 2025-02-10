import instance from "../api/index.js"


const register = async (data) => {
    const response = await instance.post("/user/register", data)
    return response
}

const login = async (data) => {
    const response = await instance.post("/user/login", data)
    return response
}

const logout = async () => {
    const response = await instance.delete("/user/logout")

    localStorage.removeItem("userInfo");
    return response
}

const refreshTokenApi = async () => {
    const response = await instance.put("/user/refresh-token")

    return response
}

const forgotPassword = async (data) => {
    const response = await instance.post("/user/password/forgot", data)

    return response
}

const sendOtp = async (data) => {
    const response = await instance.post("/user/password/otp", data)

    return response
}

const resetPassword = async (data) => {
    const response = await instance.patch("/user/password/reset", data)

    return response
}


const userService = {
    register,
    login,
    logout,
    refreshTokenApi,
    forgotPassword,
    sendOtp,
    resetPassword
}

export default userService