import StockMovementRepository from "../../../domain/repositories/StockMovementRepository";
import StockMovementEntity from "../../../domain/entities/StockMovement";
import StockMovementModel from "../../models/StockMovement";
import StockMovementType from "../../../domain/vos/StockMovementType";
import Product from "../../models/Product";
import NotFoundError from "../../../errors/NotFoundError";

export default class StockMovementRepositoryMongoose implements StockMovementRepository {
    async save(stockMovement: StockMovementEntity): Promise<StockMovementEntity> {
        const product = await Product.findById(stockMovement.productId).exec();

        if (!product) throw new NotFoundError('Product not found');

        const movementCreated = await StockMovementModel.create({
            productId: stockMovement.productId,
            movementType: stockMovement.movementType.value,
            quantity: stockMovement.quantity,
            entryDatetime: stockMovement.entryDatetime,
            comments: stockMovement.comments,
        });

        switch(stockMovement.movementType.value) {
            case StockMovementType.INFLOW:
                product.stock += stockMovement.quantity;
                break;

            case StockMovementType.OUTFLOW:
                product.stock -= stockMovement.quantity;
                break;
        }

        product.save();

        return new StockMovementEntity(
            movementCreated.productId.toString(),
            new StockMovementType(movementCreated.movementType),
            movementCreated.quantity,
            new Date(movementCreated.entryDatetime),
            movementCreated.comments || '',
            movementCreated._id.toString(),
        );
    }
}
