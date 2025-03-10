import serviceService from "../service/serviceService"

export const setService = (data) => {
  return {
    type: "SET_SERVICE",
    payload: data
  }
}

export const addService = () => {
  return async (dispatch) => {
    dispatch(fetchService())
  }
}

export const editService = () => {
  return async (dispatch) => {
    dispatch(fetchService())
  }
}

export const deleteService = () => {
  return async (dispatch) => {
    dispatch(fetchService())
  }
}

export const fetchService = (keyword) => {
  return async (dispatch) => {
    const response = await serviceService.getService(keyword);

    dispatch(setService(response.data))
  }
}