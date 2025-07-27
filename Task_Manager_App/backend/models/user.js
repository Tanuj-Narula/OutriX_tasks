import mongoose from "mongoose";

const userModel = mongoose.model("user", new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    email: {
        type: String, 
        required: true
    }, 
    password: {
        type: String,
        required: true
    }
}));

export default userModel;