const initialState = []

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ROOM":
      return action.payload
    default:
      return state
  }
}

export default roomReducer;