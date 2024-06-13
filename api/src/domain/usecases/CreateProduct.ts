import ProductRepository from "../repositories/ProductRepository";
import Product from "../entities/Product";

export default class CreateProduct {
    constructor(
        readonly repository: ProductRepository,
    ) {}

    async execute(input: CreateProductInput) {
        const product = new Product(
            input.name,
            input.type,
            input.price,
        );

        const savedProduct = await this.repository.save(product);

        return {
            id: savedProduct.id,
            name: savedProduct.name,
            type: savedProduct.type,
            price: savedProduct.price,
            stock: savedProduct.stock,
            createdAt: savedProduct.createdAt?.toLocaleString(),
            updatedAt: savedProduct.updatedAt?.toLocaleString(),
        };
    }
}

type CreateProductInput = {
    name: string,
    type: string,
    price: number,
}
