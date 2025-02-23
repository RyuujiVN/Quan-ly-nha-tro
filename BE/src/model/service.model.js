import mongoose, { Schema } from "mongoose";

const serviceSchema = new Schema({
  name: String,
  price: Number,
  unit: String,
},
  {
    timestamps: true
  }
)

const Service = mongoose.model("Service", serviceSchema, "service")

export default Service