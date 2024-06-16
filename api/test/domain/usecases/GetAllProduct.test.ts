import ProductRepositoryMemory from "../../../src/infra/repositories/memory/ProductRepositoryMemory";
import CreateProduct from "../../../src/domain/usecases/CreateProduct";
import GetAllProduct from "../../../src/domain/usecases/GetAllProduct";

test('Should recover all existing products', async function () {
    const productRepositoryMemory = new ProductRepositoryMemory();
    const createProduct = new CreateProduct(productRepositoryMemory);
    const getAllProduct = new GetAllProduct(productRepositoryMemory);

    const output1 = await createProduct.execute({
        name: 'Armário',
        type: 'Móvel',
        price: 255.99,
    });

    const retrieved1 = await getAllProduct.execute();
    expect(retrieved1).toHaveLength(1);

    const output2 = await createProduct.execute({
        name: 'Geladeira',
        type: 'Eletrodoméstico',
        price: 899.90,
    });

    const retrieved2 = await getAllProduct.execute();
    expect(retrieved2).toHaveLength(2);
});
