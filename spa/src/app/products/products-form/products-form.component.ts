import { Component, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ProductsService } from "../products.service";
import { Product } from "../product";
import { AppService } from "../../app.service";

@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.css'
})
export class ProductsFormComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  productsService: ProductsService = inject(ProductsService);
  appService: AppService = inject(AppService);

  router: Router = inject(Router);
  product: Product | undefined;

  applyForm = new FormGroup({
    name: new FormControl(),
    type: new FormControl(),
    price: new FormControl(),
  });

  constructor() {
    const productId = this.route.snapshot.params['id'];

    if (!productId) return;

    this.productsService.get(productId).subscribe({
      next: resp => {
        this.product = resp.data;
        this.applyForm.setValue({
          name: resp.data.name,
          type: resp.data.type,
          price: resp.data.price,
        });
      },
      error: info => {
        if (info.status === 404) this.appService.notify(info.error.message);
        this.router.navigate(['products']);
      }
    });
  }

  submitApplication() {
    this.productsService.save({
      id: this.product?.id ?? '',
      name: this.applyForm.value.name ?? '',
      type: this.applyForm.value.type ?? '',
      price: Number(this.applyForm.value.price) ?? 0,
    }).subscribe({
      next: resp => {
        this.router.navigate(['products']);
        this.appService.notify("Produto salvo!");
      },
      error: info => this.appService.notify(info.error.message || 'Erro ao salvar'),
    });
  }
}
