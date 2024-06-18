import StockMovementRepository from "../../../domain/repositories/StockMovementRepository";
import StockMovementEntity from "../../../domain/entities/StockMovement";
import StockMovementModel from "../../models/StockMovement";
import StockMovementType from "../../../domain/vos/StockMovementType";

export default class StockMovementRepositoryMongoose implements StockMovementRepository {
    async save(stockMovement: StockMovementEntity): Promise<StockMovementEntity> {
        const movementCreated = await StockMovementModel.create({
            productId: stockMovement.productId,
            movementType: stockMovement.movementType.value,
            quantity: stockMovement.quantity,
            entryDatetime: stockMovement.entryDatetime,
            comments: stockMovement.comments,
        });

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
