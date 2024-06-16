import StockMovementRepositoryMemory from "../../../src/infra/repositories/memory/StockMovementRepositoryMemory";
import ProductRepositoryMemory from "../../../src/infra/repositories/memory/ProductRepositoryMemory";
import AddStockMovement from "../../../src/domain/usecases/AddStockMovement";
import CreateProduct from "../../../src/domain/usecases/CreateProduct";

test('Should save a new stock entry', async function () {
    const stockMovementRepositoryMemory = new StockMovementRepositoryMemory();
    const productRepositoryMemory = new ProductRepositoryMemory();
    const createProduct = new CreateProduct(productRepositoryMemory);
    const addStockMovement = new AddStockMovement(stockMovementRepositoryMemory, productRepositoryMemory);

    const product = await createProduct.execute({
        name: 'Armário',
        type: 'Móvel',
        price: 255.99,
    });

    const date = (new Date()).toISOString();
    const addStockMovementOutput = await addStockMovement.execute({
        productId: product.id,
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
    const stockMovementRepositoryMemory = new StockMovementRepositoryMemory();
    const productRepositoryMemory = new ProductRepositoryMemory();
    const addStockMovement = new AddStockMovement(stockMovementRepositoryMemory, productRepositoryMemory);

    const stockEntryExecute = () =>
        addStockMovement.execute({
            productId: '1',
            movementType: 'inflow',
            quantity: 2,
            entryDatetime: (new Date()).toISOString(),
            comments: 'Produto da China',
        });

    await expect(stockEntryExecute).rejects.toThrow(Error);
    await expect(stockEntryExecute).rejects.toThrow('Product does not exist');
});
