import { Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';

export const ProductsRoutes: Routes = [
  { path: '', component: ProductsListComponent },
  // { path: 'new', component: ProductsFormComponent },
  // { path: 'edit/:id', component: ProductsFormComponent },
]
