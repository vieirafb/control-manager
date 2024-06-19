import {Router} from "express";
import ProductController from "../controllers/ProductController";
import ExpressAdapter from "../../adapter/ExpressAdapter";
import ProductRepositoryMongoose from "../../infra/repositories/mongoose/ProductRepositoryMongoose";
import StockMovementRepositoryMongoose from "../../infra/repositories/mongoose/StockMovementRepositoryMongoose";
import ProductRequest from "../middlewares/ProductRequest";

const productRepositoryMongoose = new ProductRepositoryMongoose();
const stockMovementRepositoryMongoose = new StockMovementRepositoryMongoose();
const productController: ProductController = new ProductController(
    productRepositoryMongoose,
    stockMovementRepositoryMongoose,
);

const ProductRoutes = Router();

ProductRoutes.get('/product', ExpressAdapter(productController.index.bind(productController)));
ProductRoutes.get('/product/:id', ProductRequest.show, ExpressAdapter(productController.show.bind(productController)));
ProductRoutes.post('/product', ProductRequest.store, ExpressAdapter(productController.store.bind(productController)));
ProductRoutes.put('/product/:id', ProductRequest.update, ExpressAdapter(productController.update.bind(productController)));
ProductRoutes.delete('/product/:id', ProductRequest.destroy, ExpressAdapter(productController.destroy.bind(productController)));
ProductRoutes.post('/product/:id/stock-movement', ProductRequest.stockMovement, ExpressAdapter(productController.addStockMovement.bind(productController)));

export default ProductRoutes;
