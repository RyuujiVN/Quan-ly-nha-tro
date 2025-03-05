import guestService from "../service/guestService"


export const setGuest = (data) => {
  return {
    type: "SET_GUEST",
    payload: data
  }
}


export const addGuest = () => {
  return async (dispatch) => {
    dispatch(fetchGuest())
  }
}

export const editGuest = () => {
  return async (dispatch) => {
    dispatch(fetchGuest())
  }
}

export const deleteGuest = () => {
  return async (dispatch) => {
    dispatch(fetchGuest())
  }
}

export const fetchGuest = (keyword) => {
  return async (dispatch) => {
    const response = await guestService.getGuest(keyword);

    dispatch(setGuest(response.data))
  }
}