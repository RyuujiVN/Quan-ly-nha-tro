import boardingHouseService from "../service/boardingHouseService";

export const setBoardingHouse = (data) => {
  return {
    type: "SET_BOARDINGHOUSE",
    payload: data
  }
}


export const addBoardingHouse = () => {
  return async (dispatch) => {
    dispatch(fetchBoardingHouse())
  }
}

export const editBoardingHouse = () => {
  return async (dispatch) => {
    dispatch(fetchBoardingHouse())
  }
}

export const deleteBoardingHouse = () => {
  return async (dispatch) => {
    dispatch(fetchBoardingHouse())
  }
}

export const fetchBoardingHouse = () => {
  return async (dispatch) => {
    const response = await boardingHouseService.get();
    dispatch(setBoardingHouse(response.data))
  }
}