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

        return Promise.resolve(savedProduct);
    }
}
