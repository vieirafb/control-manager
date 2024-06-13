import CreateProduct from "../src/domain/usecases/CreateProduct";
import ProductRepositoryMemory from "../src/infra/repositories/memory/ProductRepositoryMemory";

test('Should save a new product', async function () {
    const productRepositoryMemory = new ProductRepositoryMemory();
    const createProduct = new CreateProduct(productRepositoryMemory);
    const product = await createProduct.execute({
        name: 'Armário',
        type: 'Móvel',
        price: 255.99,
    });

    expect(product.id).not.toBeUndefined();
    expect(product.createdAt).not.toBeUndefined();
    expect(product.updatedAt).not.toBeUndefined();
});
