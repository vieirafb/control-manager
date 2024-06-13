import Product from "../entities/Product";

export default interface ProductRepository {
    save(product: Product): Promise<Product>
    update(product: Product): Promise<Product>
    get(id: string): Promise<Product>
}
