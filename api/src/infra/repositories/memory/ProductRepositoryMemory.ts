import ProductRepository from "../../../domain/repositories/ProductRepository";
import Product from "../../../domain/entities/Product";

export default class ProductRepositoryMemory implements ProductRepository {
    products: Product[] = [];

    save(product: Product): Promise<Product> {
        const savedProduct = new Product(
            product.name,
            product.type,
            product.price,
            product.stock,
            '1',
            new Date(),
            new Date(),
        );

        this.products.push(savedProduct);
        return Promise.resolve(savedProduct);
    }

    update(product: Product): Promise<Product> {
        const found = this.products.find(thisProduct => thisProduct.id === product.id);

        if (!found) throw new Error('Product not found');

        const savedProduct = new Product(
            found.name,
            found.type,
            found.price,
            found.stock,
            found.id,
            found.createdAt,
            new Date(),
        );

        this.products.push(product);
        return Promise.resolve(savedProduct);
    }

    get(id: string): Promise<Product> {
        const product = this.products.find(product => product.id === id);
        if (!product) throw new Error('Product not found');
        return Promise.resolve(product);
    }
}
