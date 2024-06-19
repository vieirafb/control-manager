import ProductRepositoryMongoose from "../../../src/infra/repositories/mongoose/ProductRepositoryMongoose";
import CreateProduct from "../../../src/domain/usecases/CreateProduct";
import DeleteProduct from "../../../src/domain/usecases/DeleteProduct";
import GetProduct from "../../../src/domain/usecases/GetProduct";
import connection from "../../../src/infra/databases/connection";
import mongoose from "mongoose";
import NotFoundError from "../../../src/errors/NotFoundError";

beforeAll(async () => {
    await connection();
});

beforeEach(async () => {
    await mongoose.model('Product').deleteMany();
});

afterAll(async () => {
    await mongoose.connection.close();
});

test('Should delete an existing product', async function () {
    const productRepositoryMongoose = new ProductRepositoryMongoose();
    const createProduct = new CreateProduct(productRepositoryMongoose);
    const deleteProduct = new DeleteProduct(productRepositoryMongoose);
    const getProduct = new GetProduct(productRepositoryMongoose);

    const createdOutput = await createProduct.execute({
        name: 'Armário',
        type: 'Móvel',
        price: 255.99,
    });

    await expect(deleteProduct.execute({id: createdOutput.id})).resolves.not.toThrow(NotFoundError);
    await expect(() => getProduct.execute({id: createdOutput.id})).rejects.toThrow(NotFoundError);
    await expect(() => getProduct.execute({id: createdOutput.id})).rejects.toThrow('Product not found');
});

test('Should throw an error exception when trying to delete a non-existent product', async function () {
    const productRepositoryMongoose = new ProductRepositoryMongoose();
    const deleteProduct = new DeleteProduct(productRepositoryMongoose);
    const id = new mongoose.Types.ObjectId();

    await expect(() => deleteProduct.execute({id: id.toString()})).rejects.toThrow(NotFoundError);
    await expect(() => deleteProduct.execute({id: id.toString()})).rejects.toThrow('Product not found');
});
