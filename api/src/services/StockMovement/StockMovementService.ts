import StockMovement from "../../models/StockMovement";
import Product from "../../models/Product";
import NotFoundError from "../../common/errors/NotFoundError";
import SaveDTO from "./DTOs/SaveDTO";

export default class StockMovementService {
    async save(input: SaveDTO) {
        const product = await Product.findById(input.productId).exec();

        if (!product) throw new NotFoundError('Product not found');

        const movementCreated = await StockMovement.create({
            productId: input.productId,
            movementType: input.movementType,
            quantity: input.quantity,
            entryDatetime: input.entryDatetime,
            comments: input.comments,
        });

        switch (input.movementType) {
            case 'inflow':
                product.stock += input.quantity;
                break;

            case 'outflow':
                product.stock -= input.quantity;
                break;
        }

        product.save();

        return movementCreated;
    }
}
