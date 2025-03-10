import instance from "../api/index.js"

const getElectricity = async (month) => {
  const response = await instance.get("/electricity-meter", {
    params: {
      month: month
    }
  })

  return response.data
}

const addElectricity = async (data) => {
  const response = await instance.post("/electricity-meter/addDelete", data)
  return response
}

const updateElectricity = async (data, id) => {
  const response = await instance.patch(`/electricity-meter/update/${id}`, data)
  return response
}


const electricityMeterService = {
  getElectricity,
  addElectricity,
  updateElectricity,
}

export default electricityMeterService