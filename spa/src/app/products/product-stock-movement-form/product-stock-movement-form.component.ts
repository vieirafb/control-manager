import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ProductsService } from "../products.service";
import { AppService } from "../../app.service";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { provideNativeDateAdapter } from "@angular/material/core";

@Component({
  selector: 'app-product-stock-movement-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './product-stock-movement-form.component.html',
  styleUrl: './product-stock-movement-form.component.css'
})
export class ProductStockMovementFormComponent {
  productsService: ProductsService = inject(ProductsService);
  appService: AppService = inject(AppService);

  @Input() productId: string = '';
  @Output() formSent = new EventEmitter<boolean>();

  applyForm = new FormGroup({
    movementType: new FormControl(),
    quantity: new FormControl(),
    entryDatetime: new FormControl(),
    comments: new FormControl(),
  });

  onSubmit() {
    this.productsService.addStockMovement(
      this.productId ?? '',
      this.applyForm.value.movementType ?? '',
      this.applyForm.value.quantity ?? '',
      this.applyForm.value.entryDatetime?.toISOString() ?? '',
      this.applyForm.value.comments ?? '',
    ).subscribe({
      next: resp => {
        this.formSent.emit(true);
        this.appService.notify("Movimentação registrada!");
      },
      error: info => {
        this.formSent.emit(false);
        this.appService.notify(info.error.message || 'Erro registrar movimentação')
      },
    });
  }
}
