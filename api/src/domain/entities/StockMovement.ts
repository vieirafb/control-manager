import StockMovementType from "../vos/StockMovementType";

export default class StockMovement {
    readonly id: string;
    readonly productId: string
    readonly movementType: StockMovementType;
    readonly quantity: number;
    readonly entryDatetime: Date;
    readonly comments: string;

    constructor(
        productId: string,
        movementType: StockMovementType,
        quantity: number,
        entryDatetime: Date,
        comments: string = '',
        id: string = '',
    ) {
        if (quantity < 0) throw Error('Quantity must be greater than 0')

        this.id = id;
        this.productId = productId;
        this.movementType = movementType;
        this.quantity = quantity;
        this.entryDatetime = entryDatetime;
        this.comments = comments;
    }
}
