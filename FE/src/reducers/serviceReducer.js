const initialState = []

const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SERVICE":
      return action.payload
    default:
      return state
  }
}

export default serviceReducer