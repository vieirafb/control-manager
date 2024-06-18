import ProductRepositoryMongoose from "../../../src/infra/repositories/mongoose/ProductRepositoryMongoose";
import CreateProduct from "../../../src/domain/usecases/CreateProduct";
import UpdateProduct from "../../../src/domain/usecases/UpdateProduct";
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

test('Should update an existing product', async function () {
    const productRepositoryMongoose = new ProductRepositoryMongoose();
    const createProduct = new CreateProduct(productRepositoryMongoose);
    const updateProduct = new UpdateProduct(productRepositoryMongoose);

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

    expect(updatedOutput.id).toBe(createdOutput.id);
    expect(updatedOutput.name).toBe('Geladeira');
    expect(updatedOutput.type).toBe('Eletrodoméstico');
    expect(updatedOutput.price).toBe(899.90);
    expect(updatedOutput.createdAt).toBe(createdOutput.createdAt);
    expect(updatedOutput.updatedAt).not.toBe(createdOutput.updatedAt);
});