import mongoose, { Schema } from "mongoose";

const forgotPasswordSchema = new Schema({
    email: String,
    otp: String,
    expireAt: {
        type: Date,
        expire: 180
    }
},
    {
        timestamps: true
    }
)

const ForgotPassword = mongoose.model("ForgotPassword", forgotPasswordSchema, "forgot-password")

export default ForgotPassword