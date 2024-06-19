import mongoose from "mongoose";

export default async function connection() {
    try {
        await mongoose.connect('mongodb://root:123@mongodb:27017/stock-control?authSource=admin');
        console.log('MongoDB iniciado na porta 27017!');
    } catch (error) {
        console.log(error);
    }
};
