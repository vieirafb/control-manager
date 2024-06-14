import StockMovementRepositoryMemory from "../src/infra/repositories/memory/StockMovementRepositoryMemory";
import ProductRepositoryMemory from "../src/infra/repositories/memory/ProductRepositoryMemory";
import StockEntry from "../src/domain/usecases/StockEntry";
import CreateProduct from "../src/domain/usecases/CreateProduct";

test('Should save a new stock entry', async function () {
    const stockMovementRepositoryMemory = new StockMovementRepositoryMemory();
    const productRepositoryMemory = new ProductRepositoryMemory();
    const createProduct = new CreateProduct(productRepositoryMemory);
    const stockEntry = new StockEntry(stockMovementRepositoryMemory, productRepositoryMemory);

    const product = await createProduct.execute({
        name: 'Armário',
        type: 'Móvel',
        price: 255.99,
    });

    const date = (new Date()).toISOString();
    const stockEntryOutput = await stockEntry.execute({
        productId: product.id,
        movementType: 'inflow',
        quantity: 2,
        entryDatetime: date,
        comments: 'Produto da China',
    });

    expect(stockEntryOutput).toHaveProperty('id');
    expect(stockEntryOutput.movementType).toBe('inflow');
    expect(stockEntryOutput.quantity).toBe(2);
    expect(stockEntryOutput.entryDatetime).toBe(date);
    expect(stockEntryOutput.comments).toBe('Produto da China');
});

test('Should throw an error exception when trying to save stock of a non-existent product', async function () {
    const stockMovementRepositoryMemory = new StockMovementRepositoryMemory();
    const productRepositoryMemory = new ProductRepositoryMemory();
    const stockEntry = new StockEntry(stockMovementRepositoryMemory, productRepositoryMemory);

    const stockEntryExecute = () =>
        stockEntry.execute({
            productId: '1',
            movementType: 'inflow',
            quantity: 2,
            entryDatetime: (new Date()).toISOString(),
            comments: 'Produto da China',
        });

    await expect(stockEntryExecute).rejects.toThrow(Error);
    await expect(stockEntryExecute).rejects.toThrow('Product does not exist');
});
