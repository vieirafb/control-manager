import ProductRepositoryMongoose from "../../../src/infra/repositories/mongoose/ProductRepositoryMongoose";
import CreateProduct from "../../../src/domain/usecases/CreateProduct";
import GetAllProduct from "../../../src/domain/usecases/GetAllProduct";
import connection from "../../../src/infra/databases/connection";
import mongoose from "mongoose";

beforeAll(async () => {
    await connection();
});

beforeEach(async () => {
    await mongoose.model('Product').deleteMany();
});

afterAll(async () => {
    await mongoose.connection.close();
});

test('Should recover all existing products', async function () {
    const productRepositoryMongoose = new ProductRepositoryMongoose();
    const createProduct = new CreateProduct(productRepositoryMongoose);
    const getAllProduct = new GetAllProduct(productRepositoryMongoose);

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
