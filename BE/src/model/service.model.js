import mongoose, { Schema } from "mongoose";

const serviceSchema = new Schema({
  name: String,
  price: Number,
  unit: String,
  quantity: {
    type: Number,
    default: 1
  }
},
  {
    timestamps: true
  }
)

const Service = mongoose.model("Service", serviceSchema, "service")

export default Service