import mongoose, { Schema } from "mongoose";
import UtilityReading from "./utility-reading.model.js";

const electricityMeterSchema = new Schema({})

const ElectricityMeter = UtilityReading.discriminator("ElectricityMeter", electricityMeterSchema, "electricity-meter")

export default ElectricityMeter