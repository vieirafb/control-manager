import mongoose, { Schema, SchemaTypes } from "mongoose";

const StockMovement = new Schema({
        productId: {
            type: SchemaTypes.ObjectId,
            ref: 'Product',
            required: true,
        },
        movementType: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        entryDatetime: {
            type: Date,
            required: true,
        },
        comments: {
            type: String,
        },
    }, { timestamps: true }
);

export default mongoose.model('StockMovement', StockMovement);
