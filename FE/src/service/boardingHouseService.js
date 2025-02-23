import instance from "../api/index.js"


const add = async (data) => {
  const response = await instance.post("/boarding-house/add", data, {
    headers: { "Content-Type": "multipart/form-data" },
  })
  return response
}


const boardingHouseService = {
  add
}

export default boardingHouseService