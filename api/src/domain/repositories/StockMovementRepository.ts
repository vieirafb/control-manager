import StockMovement from "../entities/StockMovement";

export default interface StockMovementRepository {
    save(stockMovement: StockMovement): Promise<StockMovement>;
}
