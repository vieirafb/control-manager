import mongoose from "mongoose";
import ProductService from "../../src/services/Products/ProductService";
import NotFoundError from "../../src/common/errors/NotFoundError";

beforeAll(async () => {
    await mongoose.connect(`mongodb://root:123@mongodb:27017/test?authSource=admin`);
});

beforeEach(async () => {
    await mongoose.model('Product').deleteMany();
});

afterAll(async () => {
    await mongoose.connection.close();
});

test('Should save a new product', async function () {
    const productService = new ProductService();

    const product = await productService.save({
        name: 'Armário',
        type: 'Móvel',
        price: 255.99,
    });

    expect(product._id.toString()).not.toBeUndefined();
    expect(product.createdAt.toISOString()).not.toBeUndefined();
    expect(product.updatedAt.toISOString()).not.toBeUndefined();
});

test('Should update an existing product', async function () {
    const productService = new ProductService();

    const createdOutput = await productService.save({
        name: 'Armário',
        type: 'Móvel',
        price: 255.99,
    });

    const updatedOutput = await productService.update({
        id: createdOutput._id.toString(),
        name: 'Geladeira',
        type: 'Eletrodoméstico',
        price: 899.90,
    });

    expect(updatedOutput._id.toString()).toBe(createdOutput._id.toString());
    expect(updatedOutput.name).toBe('Geladeira');
    expect(updatedOutput.type).toBe('Eletrodoméstico');
    expect(updatedOutput.price).toBe(899.90);
    expect(updatedOutput.createdAt.toISOString()).toBe(createdOutput.createdAt.toISOString());
    expect(updatedOutput.updatedAt.toISOString()).not.toBe(createdOutput.updatedAt.toISOString());
});

test('Should delete an existing product', async function () {
    const productService = new ProductService();

    const createdOutput = await productService.save({
        name: 'Armário',
        type: 'Móvel',
        price: 255.99,
    });

    await expect(productService.delete(createdOutput._id.toString())).resolves.not.toThrow(NotFoundError);
    await expect(() => productService.get(createdOutput._id.toString())).rejects.toThrow(NotFoundError);
    await expect(() => productService.get(createdOutput._id.toString())).rejects.toThrow('Product not found');
});

test('Should throw an error exception when trying to delete a non-existent product', async function () {
    const id = new mongoose.Types.ObjectId();
    const productService = new ProductService();

    await expect(() => productService.delete(id.toString())).rejects.toThrow(NotFoundError);
    await expect(() => productService.delete(id.toString())).rejects.toThrow('Product not found');
});

test('Should retrieve an existing product', async function () {
    const productService = new ProductService();

    const createdOutput = await productService.save({
        name: 'Armário',
        type: 'Móvel',
        price: 255.99,
    });

    const retrievedOutput = await productService.get(createdOutput._id.toString());

    expect(retrievedOutput._id.toString()).toBe(createdOutput._id.toString());
    expect(retrievedOutput.name).toBe(createdOutput.name);
    expect(retrievedOutput.type).toBe(createdOutput.type);
    expect(retrievedOutput.price).toBe(createdOutput.price);
    expect(retrievedOutput.createdAt.toISOString()).toBe(createdOutput.createdAt.toISOString());
    expect(retrievedOutput.updatedAt.toISOString()).toBe(createdOutput.updatedAt.toISOString());
});

test('Should recover all existing products', async function () {
    const productService = new ProductService();

    await productService.save({
        name: 'Armário',
        type: 'Móvel',
        price: 255.99,
    });

    const retrieved1 = await productService.getAll();
    expect(retrieved1).toHaveLength(1);

    await productService.save({
        name: 'Geladeira',
        type: 'Eletrodoméstico',
        price: 899.90,
    });

    const retrieved2 = await productService.getAll();
    expect(retrieved2).toHaveLength(2);
});
