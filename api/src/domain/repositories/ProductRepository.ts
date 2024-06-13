import Product from "../entities/Product";

export default interface ProductRepository {
    save(product: Product): Promise<Product>
}
