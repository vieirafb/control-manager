import ProductRepository from "../repositories/ProductRepository";
import StockMovement from "../entities/StockMovement";
import StockMovementType from "../vos/StockMovementType";
import StockMovementRepository from "../repositories/StockMovementRepository";
import NotFoundError from "../../errors/NotFoundError";

export default class AddStockMovement {
    constructor(
        readonly stockMovementRepository: StockMovementRepository,
        readonly productRepository: ProductRepository,
    ) {}

    async execute(input: StockEntryInput) {
        const productExists = await this.productRepository.exists(input.productId);
        if (!productExists) throw new NotFoundError('Product does not exist');

        const movementType = new StockMovementType(input.movementType);
        const entryDatetime = new Date(input.entryDatetime);
        const stockMovement = new StockMovement(
            input.productId,
            movementType,
            input.quantity,
            entryDatetime,
            input.comments,
        );

        const savedMovement = await this.stockMovementRepository.save(stockMovement);

        return {
            id: savedMovement.id,
            productId: savedMovement.productId,
            movementType: savedMovement.movementType.value,
            quantity: savedMovement.quantity,
            entryDatetime: savedMovement.entryDatetime.toISOString(),
            comments: savedMovement.comments,
        };
    }
}

type StockEntryInput = {
    productId: string,
    movementType: string,
    quantity: number,
    entryDatetime: string,
    comments?: string,
};
