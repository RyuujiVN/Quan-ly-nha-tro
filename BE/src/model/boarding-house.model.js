import mongoose from 'mongoose';

const boardingHouseSchema = new mongoose.Schema({
  name: String,
  address: String,
  thumbnail: String,
});

const BoardingHouse = mongoose.model("BoardingHouse", boardingHouseSchema, "boarding-house");

export default BoardingHouse