import ProductRepository from "../../domain/repositories/ProductRepository";
import StockMovementRepository from "../../domain/repositories/StockMovementRepository";
import GetAllProduct from "../../domain/usecases/GetAllProduct";
import GetProduct from "../../domain/usecases/GetProduct";
import CreateProduct from "../../domain/usecases/CreateProduct";
import UpdateProduct from "../../domain/usecases/UpdateProduct";
import DeleteProduct from "../../domain/usecases/DeleteProduct";
import AddStockMovement from "../../domain/usecases/AddStockMovement";

export default class ProductController {
    constructor(
        readonly productRepo: ProductRepository,
        readonly stockMovementRepo: StockMovementRepository,
    ) {}

    async index() {
        const getAllProduct = new GetAllProduct(this.productRepo);
        return await getAllProduct.execute()
            .then(data => ({
                response: {
                    message: 'Success',
                    data: data,
                }, status: 200,
            })).catch(error => ({error: error}))
    }

    async show(params: any) {
        const getProduct = new GetProduct(this.productRepo);

        return getProduct.execute({id: params.id})
            .then(data => ({
                response: {
                    message: 'Success',
                    data: data,
                }, status: 200,
            })).catch(error => ({error: error}))
    }

    async store(params: any, body: any) {
        const createProduct = new CreateProduct(this.productRepo);

        return await createProduct.execute({
            name: body.name,
            type: body.type,
            price: body.price,
        }).then(data => ({
            response: {
                message: 'Success',
                data: data,
            }, status: 200,
        })).catch(error => ({error: error}))
    }

    async update(params: any, body: any) {
        const updateProduct = new UpdateProduct(this.productRepo);

        return await updateProduct.execute({
            id: params.id,
            name: body.name,
            type: body.type,
            price: body.price,
        }).then(data => ({
            response: {
                message: 'Success',
                data: data,
            }, status: 200,
        })).catch(error => ({error: error}))
    }

    async destroy(params: any) {
        const deleteProduct = new DeleteProduct(this.productRepo);

        return await deleteProduct.execute({id: params.id})
            .then(() => ({status: 204}))
            .catch(error => ({error: error}))
    }

    async addStockMovement(params: any, body: any) {
        const addStockMovement = new AddStockMovement(this.stockMovementRepo, this.productRepo);

        return await addStockMovement.execute({
            productId: params.id,
            movementType: body.movementType,
            quantity: body.quantity,
            entryDatetime: body.entryDatetime,
            comments: body.comments,
        }).then(data => ({
            response: {
                message: 'Success', data: data
            }, status: 201
        })).catch(error => ({error: error}))
    }
}
