import ProductRepositoryMongoose from "../../../src/infra/repositories/mongoose/ProductRepositoryMongoose";
import CreateProduct from "../../../src/domain/usecases/CreateProduct";
import GetProduct from "../../../src/domain/usecases/GetProduct";
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

test('Should retrieve an existing product', async function () {
    const productRepositoryMongoose = new ProductRepositoryMongoose();
    const createProduct = new CreateProduct(productRepositoryMongoose);
    const getProduct = new GetProduct(productRepositoryMongoose);

    const createdOutput = await createProduct.execute({
        name: 'Armário',
        type: 'Móvel',
        price: 255.99,
    });

    const retrievedOutput = await getProduct.execute({id: createdOutput.id})

    expect(retrievedOutput.id).toBe(createdOutput.id);
    expect(retrievedOutput.name).toBe(createdOutput.name);
    expect(retrievedOutput.type).toBe(createdOutput.type);
    expect(retrievedOutput.price).toBe(createdOutput.price);
    expect(retrievedOutput.createdAt).toBe(createdOutput.createdAt);
    expect(retrievedOutput.updatedAt).toBe(createdOutput.updatedAt);
});
