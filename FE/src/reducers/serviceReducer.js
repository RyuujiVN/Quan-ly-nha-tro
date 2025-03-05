const initialState = []

const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SERVICE":
      console.log("chạy qua đây")
      return action.payload
    default:
      return state
  }
}

export default serviceReducer