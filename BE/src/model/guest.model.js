import mongoose, { Schema } from "mongoose";

const guestSchema = new Schema({
  fullName: String,
  birthDate: Date,
  identityCard: String,
  room: String,
  status: String,
  phone: String,
  email: String,
  dayOfIssue: Date,
  rentalDate: Date
},
  {
    timestamps: true
  }
)

const Guest = mongoose.model("Guest", guestSchema, "guest")

export default Guest