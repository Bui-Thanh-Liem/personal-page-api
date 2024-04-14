import mongoose from "mongoose";

const refreshTokenSchema  = new mongoose.Schema({
    token: {
        type: String,
    }
});

export default mongoose.model('RefreshToken', refreshTokenSchema);