import { Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsFormComponent } from "./products-form/products-form.component";

export const ProductsRoutes: Routes = [
  { path: '', component: ProductsListComponent },
  { path: 'new', component: ProductsFormComponent },
  { path: 'edit/:id', component: ProductsFormComponent },
]
