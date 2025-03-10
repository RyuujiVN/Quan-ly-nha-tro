const initialState = []

const waterMeterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_WATER":
      return action.payload
    default:
      return state
  }
}

export default waterMeterReducer;