const initialState = []

const electricityMeterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ELECTRICITY":
      return action.payload
    default:
      return state
  }
}

export default electricityMeterReducer;