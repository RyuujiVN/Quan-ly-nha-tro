import mongoose from 'mongoose';
import { generateString } from "../helpers/generate.js"
const accountSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isActive: {
        type: Boolean,
        default: false
    },
    verifyToken: {
        type: String,
        default: generateString(20)
    },
    avatar: {
        type: String,
        default: null
    },
});

const Account = mongoose.model("Account", accountSchema, "account");

export default Account