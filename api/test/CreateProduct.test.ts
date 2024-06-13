import ProductRepositoryMemory from "../src/infra/repositories/memory/ProductRepositoryMemory";
import CreateProduct from "../src/domain/usecases/CreateProduct";
import UpdateProduct from "../src/domain/usecases/UpdateProduct";
import DeleteProduct from "../src/domain/usecases/DeleteProduct";

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

test('Should update an existing product', async function () {
    const productRepositoryMemory = new ProductRepositoryMemory();
    const createProduct = new CreateProduct(productRepositoryMemory);
    const updateProduct = new UpdateProduct(productRepositoryMemory);

    const createdOutput = await createProduct.execute({
        name: 'Armário',
        type: 'Móvel',
        price: 255.99,
    });

    const updatedOutput = await updateProduct.execute({
        id: createdOutput.id,
        name: 'Geladeira',
        type: 'Eletrodoméstico',
        price: 899.90,
    });

    expect(updatedOutput.id).toBe('1');
    expect(updatedOutput.name).toBe('Geladeira');
    expect(updatedOutput.type).toBe('Eletrodoméstico');
    expect(updatedOutput.price).toBe(899.90);
});

test('Should delete an existing product', async function () {
    const productRepositoryMemory = new ProductRepositoryMemory();
    const createProduct = new CreateProduct(productRepositoryMemory);
    const deleteProduct = new DeleteProduct(productRepositoryMemory);

    const createdOutput = await createProduct.execute({
        name: 'Armário',
        type: 'Móvel',
        price: 255.99,
    });

    await expect(() => deleteProduct.execute({id: createdOutput.id})).not.toThrow(Error);
});

test('Should throw an error exception when trying to delete a non-existent product', async function () {
    const productRepositoryMemory = new ProductRepositoryMemory();
    const deleteProduct = new DeleteProduct(productRepositoryMemory);

    await expect(() => deleteProduct.execute({id: '1'})).rejects.toThrow(Error);
    await expect(() => deleteProduct.execute({id: '1'})).rejects.toThrow('Product not found');
});
