import ProductRepositoryMemory from "../../../src/infra/repositories/memory/ProductRepositoryMemory";
import CreateProduct from "../../../src/domain/usecases/CreateProduct";
import DeleteProduct from "../../../src/domain/usecases/DeleteProduct";
import GetProduct from "../../../src/domain/usecases/GetProduct";

test('Should delete an existing product', async function () {
    const productRepositoryMemory = new ProductRepositoryMemory();
    const createProduct = new CreateProduct(productRepositoryMemory);
    const deleteProduct = new DeleteProduct(productRepositoryMemory);
    const getProduct = new GetProduct(productRepositoryMemory);

    const createdOutput = await createProduct.execute({
        name: 'Armário',
        type: 'Móvel',
        price: 255.99,
    });

    await expect(() => deleteProduct.execute({id: createdOutput.id})).not.toThrow(Error);
    await expect(() => getProduct.execute({id: createdOutput.id})).rejects.toThrow(Error);
    await expect(() => getProduct.execute({id: createdOutput.id})).rejects.toThrow('Product not found');
});

test('Should throw an error exception when trying to delete a non-existent product', async function () {
    const productRepositoryMemory = new ProductRepositoryMemory();
    const deleteProduct = new DeleteProduct(productRepositoryMemory);

    await expect(() => deleteProduct.execute({id: '1'})).rejects.toThrow(Error);
    await expect(() => deleteProduct.execute({id: '1'})).rejects.toThrow('Product not found');
});