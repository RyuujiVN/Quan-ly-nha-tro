import { Schema } from "mongoose";
import UtilityReading from "./utility-reading.model.js";

const waterMeterSchema = new Schema({})

const WaterMeter = UtilityReading.discriminator("WaterMeter", waterMeterSchema, "water-meter")

export default WaterMeter