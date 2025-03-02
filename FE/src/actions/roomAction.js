
import roomService from "../service/roomService";

export const setRoom = (data) => {
  return {
    type: "SET_ROOM",
    payload: data
  }
}


export const addRoom = (boardingHouseId) => {
  return async (dispatch) => {
    dispatch(fetchRoom(boardingHouseId, ""))
  }
}

export const editRoom = (boardingHouseId) => {
  return async (dispatch) => {
    dispatch(fetchRoom(boardingHouseId, ""))
  }
}

export const deleteRoom = (boardingHouseId) => {
  return async (dispatch) => {
    dispatch(fetchRoom(boardingHouseId, ""))
  }
}

export const fetchRoom = (boardingHouseId, keyword) => {
  return async (dispatch) => {
    const response = await roomService.getRooms(boardingHouseId, keyword);

    dispatch(setRoom(response.data))
  }
}