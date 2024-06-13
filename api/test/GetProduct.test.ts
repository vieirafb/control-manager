import ProductRepositoryMemory from "../src/infra/repositories/memory/ProductRepositoryMemory";
import CreateProduct from "../src/domain/usecases/CreateProduct";
import GetProduct from "../src/domain/usecases/GetProduct";

test('Should retrieve an existing product', async function () {
    const productRepositoryMemory = new ProductRepositoryMemory();
    const createProduct = new CreateProduct(productRepositoryMemory);
    const getProduct = new GetProduct(productRepositoryMemory);

    const createdOutput = await createProduct.execute({
        name: 'Armário',
        type: 'Móvel',
        price: 255.99,
    });

    const retrievedOutput = await getProduct.execute({id: createdOutput.id})

    expect(retrievedOutput.id).not.toBeUndefined();
    expect(retrievedOutput.name).toBe('Armário');
    expect(retrievedOutput.type).toBe('Móvel');
    expect(retrievedOutput.price).toBe(255.99);
    expect(retrievedOutput.createdAt).not.toBeUndefined();
    expect(retrievedOutput.updatedAt).not.toBeUndefined();
});