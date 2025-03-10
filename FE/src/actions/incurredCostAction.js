
import incurredCostService from "../service/incurredCostService";

export const setIncurredCost = (data) => {
  return {
    type: "SET_INCURREDCOST",
    payload: data
  }
}


export const addIncurredCost = () => {
  return async (dispatch) => {
    dispatch(fetchIncurredCost())
  }
}

export const editIncurredCost = () => {
  return async (dispatch) => {
    dispatch(fetchIncurredCost())
  }
}

export const deleteIncurredCost = () => {
  return async (dispatch) => {
    dispatch(fetchIncurredCost())
  }
}

export const fetchIncurredCost = (month) => {
  return async (dispatch) => {
    const response = await incurredCostService.getIncurredCost(month)

    dispatch(setIncurredCost(response.data))
  }
}