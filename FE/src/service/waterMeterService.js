import instance from "../api/index.js"

const getWater = async (month) => {
  const response = await instance.get("/water-meter", {
    params: {
      month: month
    }
  })

  return response.data
}

const addWater = async (data) => {
  const response = await instance.post("/water-meter/addDelete", data)
  return response
}

const updateWater = async (data, id) => {
  const response = await instance.patch(`/water-meter/update/${id}`, data)
  return response
}


const waterMeterService = {
  getWater,
  addWater,
  updateWater,
}

export default waterMeterService