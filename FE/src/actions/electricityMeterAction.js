import electricityMeterService from "../service/electricityMeterService"


export const setElectricity = (data) => {
  return {
    type: "SET_ELECTRICITY",
    payload: data
  }
}

export const fetchElectricityMeter = (month) => {
  return async (dispatch) => {
    const response = await electricityMeterService.getElectricity(month);
    
    dispatch(setElectricity(response.data))
  }
}