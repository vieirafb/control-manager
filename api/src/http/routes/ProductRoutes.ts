import {Router} from "express";
import ProductController from "../controllers/ProductController";
import ExpressAdapter from "../../adapter/ExpressAdapter";
import ProductRepositoryMongoose from "../../infra/repositories/mongoose/ProductRepositoryMongoose";
import StockMovementRepositoryMongoose from "../../infra/repositories/mongoose/StockMovementRepositoryMongoose";

const productRepositoryMongoose = new ProductRepositoryMongoose();
const stockMovementRepositoryMongoose = new StockMovementRepositoryMongoose();
const productController: ProductController = new ProductController(
    productRepositoryMongoose,
    stockMovementRepositoryMongoose,
);

const ProductRoutes = Router();

ProductRoutes.get('/product', ExpressAdapter(productController.index.bind(productController)));
ProductRoutes.get('/product/:id', ExpressAdapter(productController.show.bind(productController)));
ProductRoutes.post('/product', ExpressAdapter(productController.store.bind(productController)));
ProductRoutes.put('/product/:id', ExpressAdapter(productController.update.bind(productController)));
ProductRoutes.delete('/product/:id', ExpressAdapter(productController.destroy.bind(productController)));
ProductRoutes.post('/product/:id/stock-movement', ExpressAdapter(productController.addStockMovement.bind(productController)));

export default ProductRoutes;
