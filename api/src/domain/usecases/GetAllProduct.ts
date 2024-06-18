import ProductRepository from "../repositories/ProductRepository";

export default class GetAllProduct {
    constructor(
        readonly repository: ProductRepository,
    ) {}

    async execute() {
        const products = await this.repository.getAll();

        return products.map(product => ({
            id: product.id,
            name: product.name,
            type: product.type,
            price: product.price,
            stock: product.stock,
            createdAt: product.createdAt?.toISOString(),
            updatedAt: product.updatedAt?.toISOString(),
        }));
    }
}
