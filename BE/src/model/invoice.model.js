import mongoose, { Schema } from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  roomId: {
    type: Schema.Types.ObjectId,
    ref: "Room"
  },
  guestId: {
    type: Schema.Types.ObjectId,
    ref: "Guest"
  },
  incurredCostId: [
    {
      type: Schema.Types.ObjectId,
      ref: "IncurredCost"
    }
  ],
  electricityMeterId: {
    type: Schema.Types.ObjectId,
    ref: "ElectricityMeter"
  },
  waterMeterId: {
    type: Schema.Types.ObjectId,
    ref: "WaterMeter"
  },
  totalCost: {
    type: Number,
    default: 0
  },
  paid: {
    type: Number,
    default: 0
  },
  month: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: "Chưa Thanh Toán"
  },
  user: String
});

const Invoice = mongoose.model("Invoice", invoiceSchema, "invoice");

export default Invoice