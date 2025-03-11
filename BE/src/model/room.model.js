import mongoose, { Schema } from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: String,
  quantityPeople: String,
  roomArea: Number,
  price: Number,
  thumbnail: String,
  status: String,
  boardingHouseId: {
    type: Schema.Types.ObjectId,
    ref: "BoardingHouse"
  },
  service_id: {
    type: Array,
    default: []
  },
  user: String
});

const Room = mongoose.model("Room", roomSchema, "room");

export default Room