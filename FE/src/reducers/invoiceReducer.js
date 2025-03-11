const initialState = []

const invoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_INVOICE":
      return action.payload
    default:
      return state
  }
}

export default invoiceReducer;