import mongoose, {Schema} from "mongoose";

const ProductsSchema = new Schema({
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
            default: 0,
        },
    }, {timestamps: true}
);

const Product = mongoose.model('Product', ProductsSchema);
export default Product;
