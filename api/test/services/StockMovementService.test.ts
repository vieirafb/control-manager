import mongoose from "mongoose";
import NotFoundError from "../../src/common/errors/NotFoundError";
import ProductService from "../../src/services/Products/ProductService";
import StockMovementService from "../../src/services/StockMovement/StockMovementService";

beforeAll(async () => {
    await mongoose.connect(`mongodb://root:123@mongodb:27017/test?authSource=admin`);
});

beforeEach(async () => {
    await mongoose.model('Product').deleteMany();
    await mongoose.model('StockMovement').deleteMany();
});

afterAll(async () => {
    await mongoose.connection.close();
});

test('Should save a new stock entry', async function () {
    const productService = new ProductService();
    const stockMovementService = new StockMovementService();

    const productCreated = await productService.save({
        name: 'Armário',
        type: 'Móvel',
        price: 255.99,
    });

    const date = (new Date()).toISOString();
    const addStockMovementOutput = await stockMovementService.save({
        productId: productCreated._id.toString(),
        movementType: 'inflow',
        quantity: 2,
        entryDatetime: date,
        comments: 'Produto da China',
    });

    expect(addStockMovementOutput).toHaveProperty('_id');
    expect(addStockMovementOutput.movementType).toBe('inflow');
    expect(addStockMovementOutput.quantity).toBe(2);
    expect(addStockMovementOutput.entryDatetime.toISOString()).toBe(date);
    expect(addStockMovementOutput.comments).toBe('Produto da China');
});

test('Should throw an error exception when trying to save stock of a non-existent product', async function () {
    const id = new mongoose.Types.ObjectId();
    const stockMovementService = new StockMovementService();

    const stockEntryExecute = () =>
        stockMovementService.save({
            productId: id.toString(),
            movementType: 'inflow',
            quantity: 2,
            entryDatetime: (new Date()).toISOString(),
            comments: 'Produto da China',
        });

    await expect(stockEntryExecute).rejects.toThrow(NotFoundError);
    await expect(stockEntryExecute).rejects.toThrow('Product not found');
});
