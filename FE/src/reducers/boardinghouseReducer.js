const initialState = []

const boardingHouseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_BOARDINGHOUSE":
      return action.payload
    default:
      return state
  }
}

export default boardingHouseReducer;