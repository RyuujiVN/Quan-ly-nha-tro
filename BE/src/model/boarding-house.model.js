import mongoose, { Schema } from 'mongoose';

const boardingHouseSchema = new mongoose.Schema({
  name: String,
  address: String,
  thumbnail: String,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "Account"
  }
});

const BoardingHouse = mongoose.model("BoardingHouse", boardingHouseSchema, "boarding-house");

export default BoardingHouse