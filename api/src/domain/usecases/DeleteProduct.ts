import ProductRepository from "../repositories/ProductRepository";

export default class DeleteProduct {
    constructor(
        readonly repository: ProductRepository,
    ) {}

    async execute(input: DeleteProductInput) {
        const product = await this.repository.get(input.id);
        await this.repository.delete(product.id);
    }
}

type DeleteProductInput = {
    id: string,
}
