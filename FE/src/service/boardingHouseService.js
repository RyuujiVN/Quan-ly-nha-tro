import instance from "../api/index.js"

const get = async () => {
  const response = await instance.get("/boarding-house")

  return response.data
}

const add = async (data) => {
  const response = await instance.post("/boarding-house/add", data, {
    headers: { "Content-Type": "multipart/form-data" },
  })
  return response
}


const boardingHouseService = {
  get,
  add
}

export default boardingHouseService