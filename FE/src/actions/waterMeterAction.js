import waterMeterService from "../service/waterMeterService";



export const setWater = (data) => {
  return {
    type: "SET_WATER",
    payload: data
  }
}

export const fetchWaterMeter = (month) => {
  return async (dispatch) => {
    const response = await waterMeterService.getWater(month);

    dispatch(setWater(response.data))
  }
}