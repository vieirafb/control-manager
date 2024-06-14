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
            String(this.products.length + 1),
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

    getAll(): Promise<Product[]> {
        return Promise.resolve(this.products);
    }

    delete(id: string): Promise<void> {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) throw new Error('Product not found');
        this.products.splice(index, 1);
        return Promise.resolve();
    }

    exists(id: string): Promise<boolean> {
        const product = this.products.find(product => product.id === id);
        return Promise.resolve(!!product);
    }
}
