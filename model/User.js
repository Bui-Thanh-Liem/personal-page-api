import mongoose from "mongoose";

const schemaUser = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: 6,
            maxlength: 20,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: (value) => {
                    // Sử dụng regex để kiểm tra định dạng email
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                },
                message: "Email is invalid, please check again !",
            },
        },
        password: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            default: "user"
        }
    },
    { timestamps: true }
);

export default mongoose.model("User", schemaUser);
