import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "subscriber"
    },
    root: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model("User", userSchema);