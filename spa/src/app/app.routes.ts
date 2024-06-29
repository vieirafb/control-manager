import { Routes } from '@angular/router';
import ProductsRoutes from "./products/products.routes";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products'
  },
  {
    path: '',
    loadChildren: () => ProductsRoutes
  },
];
