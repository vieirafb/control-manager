import StockMovementRepositoryMongoose from "../../../src/infra/repositories/mongoose/StockMovementRepositoryMongoose";
import ProductRepositoryMongoose from "../../../src/infra/repositories/mongoose/ProductRepositoryMongoose";
import AddStockMovement from "../../../src/domain/usecases/AddStockMovement";
import CreateProduct from "../../../src/domain/usecases/CreateProduct";
import connection from "../../../src/infra/databases/connection";
import mongoose from "mongoose";
import NotFoundError from "../../../src/errors/NotFoundError";

beforeAll(async () => {
    await connection();
});

beforeEach(async () => {
    await mongoose.model('Product').deleteMany();
    await mongoose.model('StockMovement').deleteMany();
});

afterAll(async () => {
    await mongoose.connection.close();
});

test('Should save a new stock entry', async function () {
    const stockMovementRepositoryMongoose = new StockMovementRepositoryMongoose();
    const productRepositoryMongoose = new ProductRepositoryMongoose();
    const createProduct = new CreateProduct(productRepositoryMongoose);
    const addStockMovement = new AddStockMovement(stockMovementRepositoryMongoose, productRepositoryMongoose);

    const productCreated = await createProduct.execute({
        name: 'Armário',
        type: 'Móvel',
        price: 255.99,
    });

    const date = (new Date()).toISOString();
    const addStockMovementOutput = await addStockMovement.execute({
        productId: productCreated.id,
        movementType: 'inflow',
        quantity: 2,
        entryDatetime: date,
        comments: 'Produto da China',
    });

    expect(addStockMovementOutput).toHaveProperty('id');
    expect(addStockMovementOutput.movementType).toBe('inflow');
    expect(addStockMovementOutput.quantity).toBe(2);
    expect(addStockMovementOutput.entryDatetime).toBe(date);
    expect(addStockMovementOutput.comments).toBe('Produto da China');
});

test('Should throw an error exception when trying to save stock of a non-existent product', async function () {
    const stockMovementRepositoryMongoose = new StockMovementRepositoryMongoose();
    const productRepositoryMongoose = new ProductRepositoryMongoose();
    const addStockMovement = new AddStockMovement(stockMovementRepositoryMongoose, productRepositoryMongoose);
    const id = new mongoose.Types.ObjectId();

    const stockEntryExecute = () =>
        addStockMovement.execute({
            productId: id.toString(),
            movementType: 'inflow',
            quantity: 2,
            entryDatetime: (new Date()).toISOString(),
            comments: 'Produto da China',
        });

    await expect(stockEntryExecute).rejects.toThrow(NotFoundError);
    await expect(stockEntryExecute).rejects.toThrow('Product does not exist');
});
