import mongoose, { Schema } from "mongoose";

const guestSchema = new Schema({
  fullName: String,
  birthDate: Date,
  identityCard: String,
  status: String,
  phone: String,
  email: String,
  dayOfIssue: Date,
  rentalDate: Date,
  boardingHouseRent: String,
  roomRent: String
},
  {
    timestamps: true
  }
)

const Guest = mongoose.model("Guest", guestSchema, "guest")

export default Guest