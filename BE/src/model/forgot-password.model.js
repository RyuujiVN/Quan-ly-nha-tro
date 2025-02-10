import mongoose, { Schema } from "mongoose";

const forgotPasswordSchema = new Schema({
    email: String,
    otp: String,
    expireAt: {
        type: Date,
        expires: 60,
        index: true
    }
},
    {
        timestamps: true
    }
)


const ForgotPassword = mongoose.model("ForgotPassword", forgotPasswordSchema, "forgot-password")

export default ForgotPassword