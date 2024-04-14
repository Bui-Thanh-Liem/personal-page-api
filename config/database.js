import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.URI_DATABASE_DEV}`);
        console.log("Connect database successfully !");
    } catch (error) {
        console.log(error);
    }
};

export const disconnectDB = async () => {
    mongoose.disconnect();
    console.log("Disconnect database successfully !");
};


