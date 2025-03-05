import instance from "../api/index.js"

const getService = async () => {
  const response = await instance.get("/service")

  return response.data
}

const addSerivce = async (data) => {
  const response = await instance.post("/service/add", data)
  return response
}

const editService = async (data, id) => {
  const response = await instance.patch(`/service/edit/${id}`, data)
  return response
}

const deleteService = async (id) => {
  const response = await instance.delete(`/service/delete/${id}`)
  return response
}

const serviceService = {
  getService,
  addSerivce,
  editService,
  deleteService
}

export default serviceService