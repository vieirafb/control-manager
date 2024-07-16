import { Router } from "express";
import ProductController from "../http/controllers/ProductController";
import ExpressAdapter from "../common/adapter/ExpressAdapter";
import ProductRequest from "../http/middlewares/ProductRequest";
import ProductService from "../services/Products/ProductService";
import StockMovementService from "../services/StockMovement/StockMovementService";

const productRepositoryMongoose = new ProductService();
const stockMovementRepositoryMongoose = new StockMovementService();

const productController: ProductController = new ProductController(
    productRepositoryMongoose,
    stockMovementRepositoryMongoose,
);

const ProductRoutes = Router();

ProductRoutes.get('/product', ProductRequest.list, ExpressAdapter(productController.list.bind(productController)));
ProductRoutes.get('/product/:id', ProductRequest.show, ExpressAdapter(productController.show.bind(productController)));
ProductRoutes.post('/product', ProductRequest.store, ExpressAdapter(productController.store.bind(productController)));
ProductRoutes.put('/product/:id', ProductRequest.update, ExpressAdapter(productController.update.bind(productController)));
ProductRoutes.delete('/product/:id', ProductRequest.destroy, ExpressAdapter(productController.destroy.bind(productController)));
ProductRoutes.post('/product/:id/stock-movement', ProductRequest.stockMovement, ExpressAdapter(productController.addStockMovement.bind(productController)));

export default ProductRoutes;
