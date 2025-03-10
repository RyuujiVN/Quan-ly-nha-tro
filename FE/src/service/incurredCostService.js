import instance from "../api/index.js"

const getIncurredCost = async (month) => {
  const response = await instance.get("/incurred-cost", {
    params: {
      month: month
    }
  })

  return response.data
}

const addIncurredCost = async (data) => {
  const response = await instance.post("/incurred-cost/add", data)
  return response
}

const editIncurredCost = async (data, id) => {
  const response = await instance.patch(`/incurred-cost/edit/${id}`, data)
  return response
}

const deleteIncurredCost = async (id) => {
  const response = await instance.delete(`/incurred-cost/delete/${id}`)
  return response
}

const incurredCostService = {
  getIncurredCost,
  addIncurredCost,
  editIncurredCost,
  deleteIncurredCost
}

export default incurredCostService