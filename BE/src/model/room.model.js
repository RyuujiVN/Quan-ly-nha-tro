import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: String,
  quantityPeople: String,
  roomArea: Number,
  price: Number,
  thumbnail: String,
  status: String,
  boardingHouseId: String,
});

const Room = mongoose.model("Room", roomSchema, "room");

export default Room