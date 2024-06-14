import StockMovementRepository from "../../../domain/repositories/StockMovementRepository";
import StockMovement from "../../../domain/entities/StockMovement";

export default class StockMovementRepositoryMemory implements StockMovementRepository {
    private stockMovement: StockMovement[] = [];

    save(stockMovement: StockMovement): Promise<StockMovement> {
        const savedMovement = new StockMovement(
            stockMovement.productId,
            stockMovement.movementType,
            stockMovement.quantity,
            stockMovement.entryDatetime,
            stockMovement.comments,
            String(this.stockMovement.length + 1),
        );

        this.stockMovement.push(savedMovement);
        return Promise.resolve(savedMovement);
    }
}
