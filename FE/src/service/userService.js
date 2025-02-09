import instance from "../api/index.js"


const register = async (data) => {
    const response = await instance.post("/user/register", data)
    return response
}

const login = async (data) => {
    const response = await instance.post("/user/login", data)
    return response
}

const userService = {
    register,
    login
}

export default userService