import ProductRepository from "../repositories/ProductRepository";

export default class GetProduct {
    constructor(
        readonly repository: ProductRepository,
    ) {}

    async execute(input: GetProductInput) {
        const product = await this.repository.get(input.id);

        return {
            id: product.id,
            name: product.name,
            type: product.type,
            price: product.price,
            stock: product.stock,
            createdAt: product.createdAt?.toLocaleString(),
            updatedAt: product.updatedAt?.toLocaleString(),
        };
    }
}

type GetProductInput = {
    id: string,
}
