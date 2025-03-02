import instance from "../api"

const getRooms = async (id, keyword) => {
  const response = await instance.get(`/room`, {
    params: {
      boardingHouseId: id,
      keyword: keyword
    }
  })

  return response.data
}

const addRoom = async (data) => {
  const respone = await instance.post("/room/add", data, {
    headers: { "Content-Type": "multipart/form-data" },
  })

  return respone
}

const editRoom = async (data, id) => {
  const respone = await instance.patch(`/room/edit/${id}`, data, {
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
  editRoom,
  deleteRoom
}

export default roomService