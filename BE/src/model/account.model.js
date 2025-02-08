import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    avatar: String,
});

const Account = mongoose.model("Account", accountSchema, "account");

export default Account