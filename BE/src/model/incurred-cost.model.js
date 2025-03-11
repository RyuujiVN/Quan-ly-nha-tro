import mongoose, { Schema } from "mongoose";

const incurredCostSchema = new Schema({
  roomId: {
    type: Schema.Types.ObjectId,
    ref: "Room"
  },
  month: Date,
  payBy: String,
  price: Number,
  description: String,
  user: String
},
  {
    timestamps: true
  }
)

const IncurredCost = mongoose.model("IncurredCost", incurredCostSchema, "incurred-cost")

export default IncurredCost