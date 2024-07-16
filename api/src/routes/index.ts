import { Router } from "express";
import ProductRoutes from "./ProductRoutes";

const Routes = Router();

Routes.use('/', ProductRoutes);

export default Routes;
