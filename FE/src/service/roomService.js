import instance from "../api"

const getRooms = async (id, keyword) => {
  const response = await instance.get(`/room`, {
    params: {
      boardingHouseId: id,
      keyword: keyword
    }
  })

  return response
}

const addRoom = async (data) => {
  const respone = await instance.post("/room/add", data, {
    headers: { "Content-Type": "multipart/form-data" },
  })

  return respone
}

const deleteRoom = async (id) => {
  const response = await instance.delete(`/room/delete/${id}`)
  return response
}

const roomService = {
  getRooms,
  addRoom,
  deleteRoom
}

export default roomService