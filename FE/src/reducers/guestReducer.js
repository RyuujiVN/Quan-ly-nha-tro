const initialState = []

const guestReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_GUEST":
      return action.payload
    default:
      return state
  }
}

export default guestReducer;