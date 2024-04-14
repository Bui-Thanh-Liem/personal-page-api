import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: [String],
            required: true,
        },
        imgs: {
            type: [String],
            required: true,
        },
        quantityComments: {
            type: Number,
            default: 0,
        },
        like: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
