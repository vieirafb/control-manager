import ProductService from "../../services/./Products/ProductService";
import StockMovementService from "../../services/StockMovement/StockMovementService";

export default class ProductController {
    constructor(
        readonly productService: ProductService,
        readonly stockMovementService: StockMovementService,
    ) {}

    async index() {
        return await this.productService.getAll()
            .then(data => ({
                response: {
                    message: 'Success',
                    data: data,
                }, status: 200,
            })).catch(error => ({ error: error }))
    }

    async show(params: any) {
        return this.productService.get(params.id)
            .then(data => ({
                response: {
                    message: 'Success',
                    data: data,
                }, status: 200,
            })).catch(error => ({ error: error }))
    }

    async store(params: any, body: any) {
        return await this.productService.save({
            name: body.name,
            type: body.type,
            price: body.price,
        }).then(data => ({
            response: {
                message: 'Success',
                data: data,
            }, status: 200,
        })).catch(error => ({ error: error }))
    }

    async update(params: any, body: any) {
        console.log(params, body)
        return await this.productService.update({
            id: params.id,
            name: body.name,
            type: body.type,
            price: body.price,
        }).then(data => ({
            response: {
                message: 'Success',
                data: data,
            }, status: 200,
        })).catch(error => ({ error: error }))
    }

    async destroy(params: any) {
        return await this.productService.delete(params.id)
            .then(() => ({ status: 204 }))
            .catch(error => ({ error: error }))
    }

    async addStockMovement(params: any, body: any) {
        return await this.stockMovementService.save({
            productId: params.id,
            movementType: body.movementType,
            quantity: body.quantity,
            entryDatetime: body.entryDatetime,
            comments: body.comments,
        }).then(data => ({
            response: {
                message: 'Success', data: data
            }, status: 201
        })).catch(error => ({ error: error }))
    }

    async list(params: any, query: any) {
        return {
            response: await this.productService.list(query),
            status: 200,
        };
    }
}
