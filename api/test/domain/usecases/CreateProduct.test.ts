import ProductRepositoryMongoose from "../../../src/infra/repositories/mongoose/ProductRepositoryMongoose";
import CreateProduct from "../../../src/domain/usecases/CreateProduct";
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

test('Should save a new product', async function () {
    const productRepositoryMongoose = new ProductRepositoryMongoose();
    const createProduct = new CreateProduct(productRepositoryMongoose);

    const product = await createProduct.execute({
        name: 'Armário',
        type: 'Móvel',
        price: 255.99,
    });

    expect(product.id).not.toBeUndefined();
    expect(product.createdAt).not.toBeUndefined();
    expect(product.updatedAt).not.toBeUndefined();
});
