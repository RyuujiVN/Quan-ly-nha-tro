import invoiceService from "../service/invoiceService";

export const setInvoice = (data) => {
  return {
    type: "SET_INVOICE",
    payload: data
  }
}


export const addBoardingHouse = () => {
  return async (dispatch) => {
    dispatch(fetchInvoice())
  }
}

export const fetchInvoice = (month) => {
  return async (dispatch) => {
    const response = await invoiceService.getInvoice(month)
    dispatch(setInvoice(response.data))
  }
}