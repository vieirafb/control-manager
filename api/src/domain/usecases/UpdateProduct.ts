import ProductRepository from "../repositories/ProductRepository";

export default class UpdateProduct {
    constructor(
        readonly repository: ProductRepository,
    ) {}

    async execute(input: UpdateProductInput) {
        const product = await this.repository.get(input.id);

        product.name = input.name;
        product.type = input.type;
        product.price = input.price;

        const savedProduct = await this.repository.update(product);

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

type UpdateProductInput = {
    id: string,
    name: string,
    type: string,
    price: number,
}
