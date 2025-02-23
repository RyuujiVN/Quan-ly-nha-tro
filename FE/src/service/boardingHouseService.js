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

const edit = async (data, id) => {
  const response = await instance.patch(`/boarding-house/edit/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  })
  return response
}

const deleteBoardingHouse = async (id) => {
  const response = await instance.delete(`/boarding-house/delete/${id}`)
  return response
}

const boardingHouseService = {
  get,
  add,
  edit,
  deleteBoardingHouse
}

export default boardingHouseService