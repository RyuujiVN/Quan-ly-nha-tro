import instance from "../api/index.js"

const getInvoice = async (month) => {
  const response = await instance.get("/invoice", {
    params: {
      month: month
    }
  })

  return response.data
}

const createInvoice = async (month) => {
  const response = await instance.post("/invoice/create", month)

  return response
}

const deleteInvoice = async (id) => {
  const response = await instance.delete(`/invoice/delete/${id}`)

  return response
}

const invoiceService = {
  getInvoice,
  createInvoice,
  deleteInvoice
}

export default invoiceService