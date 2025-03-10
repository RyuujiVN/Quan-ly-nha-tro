const initialState = []

const incurredCostReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_INCURREDCOST":
      return action.payload
    default:
      return state
  }
}

export default incurredCostReducer;