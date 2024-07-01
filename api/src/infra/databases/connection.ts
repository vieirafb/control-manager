import mongoose from "mongoose";

export default async function connection() {
    try {
        await mongoose.connect(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@mongodb:${process.env.MONGO_PORT}/stock-control?authSource=admin`);
        console.log(`MongoDB iniciado na porta ${process.env.MONGO_PORT}!`);
    } catch (error) {
        console.log(error);
    }
};
