import instance from "../api/index.js"

const getGuest = async (keyword) => {
  const response = await instance.get("/guest", {
    params: {
      keyword: keyword
    }
  })

  return response.data
}

const addGuest = async (data) => {
  const response = await instance.post("/guest/add", data)
  return response
}

const editGuest = async (data, id) => {
  const response = await instance.patch(`/guest/edit/${id}`, data)
  return response
}

const deleteGuest = async (id) => {
  const response = await instance.delete(`/guest/delete/${id}`)
  return response
}

const guestService = {
  getGuest,
  addGuest,
  editGuest,
  deleteGuest
}

export default guestService