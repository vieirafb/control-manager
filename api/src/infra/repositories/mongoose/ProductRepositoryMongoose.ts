import ProductRepository from "../../../domain/repositories/ProductRepository";
import ProductEntity from "../../../domain/entities/Product";
import ProductsModel from "../../models/Product";


export default class ProductRepositoryMongoose implements ProductRepository {
    async save(product: ProductEntity): Promise<ProductEntity> {
        const response = await ProductsModel.create({
            name: product.name,
            type: product.type,
            price: product.price,
        });

        return new ProductEntity(
            response.name,
            response.type,
            response.price,
            response.stock,
            response._id.toString(),
            new Date(response.createdAt),
            new Date(response.updatedAt),
        );
    }

    async update(product: ProductEntity): Promise<ProductEntity> {
        const response = await ProductsModel.findByIdAndUpdate(product.id, {
            name: product.name,
            type: product.type,
            price: product.price,
        }, {new: true});

        if (!response) throw new Error('Product not found');

        return new ProductEntity(
            response.name,
            response.type,
            response.price,
            response.stock,
            response._id.toString(),
            new Date(response.createdAt),
            new Date(response.updatedAt),
        );
    }

    async get(id: string): Promise<ProductEntity> {
        const response = await ProductsModel.findById(id).exec();

        if (!response) throw new Error('Product not found');

        return new ProductEntity(
            response.name,
            response.type,
            response.price,
            response.stock,
            response._id.toString(),
            new Date(response.createdAt),
            new Date(response.updatedAt),
        );
    }

    async getAll(): Promise<ProductEntity[]> {
        const products: ProductEntity[] = [];
        const response = ProductsModel.find();

        for await (const content of response) {
            products.push(new ProductEntity(
                content.name,
                content.type,
                content.price,
                content.stock,
                content._id.toString(),
                new Date(content.createdAt),
                new Date(content.updatedAt),
            ));
        }

        return products;
    }

    async delete(id: string): Promise<void> {
        const response = await ProductsModel.findByIdAndDelete(id).exec();
        if (!response) throw new Error('Product not found');
    }

    async exists(id: string): Promise<boolean> {
        const existis = await ProductsModel.exists({_id: id});
        return !!existis;
    }
}
