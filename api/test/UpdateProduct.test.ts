import ProductRepositoryMemory from "../src/infra/repositories/memory/ProductRepositoryMemory";
import CreateProduct from "../src/domain/usecases/CreateProduct";
import UpdateProduct from "../src/domain/usecases/UpdateProduct";

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