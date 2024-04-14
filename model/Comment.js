import mongoose from "mongoose";

// const SchemaType = mongoose.Schema;
const commentsSchema = new mongoose.Schema(
    {
        blogId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Comment", commentsSchema);
