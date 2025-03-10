import mongoose, { Schema } from "mongoose";

const utilityReadingSchema = new Schema({
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room"
  },
  time: {
    type: Date,
    default: Date.now
  },
  old: {
    type: Number,
    default: 0
  },
  new: {
    type: Number,
    default: 0
  },
},
  {
    discriminatorKey: 'type',
    timestamps: true
  }
)

const UtilityReading = mongoose.model("UtilityReading", utilityReadingSchema, "utility-reading")

export default UtilityReading