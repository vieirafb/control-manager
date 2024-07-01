import { Component, inject } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {
  ProductStockMovementFormComponent
} from "../product-stock-movement-form/product-stock-movement-form.component";

@Component({
  selector: 'app-product-stock-movement-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ProductStockMovementFormComponent,
  ],
  templateUrl: './product-stock-movement-dialog.component.html',
  styleUrl: './product-stock-movement-dialog.component.css'
})
export class ProductStockMovementDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ProductStockMovementDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  formSent(success: boolean) {
    if (success) this.dialogRef.close(success);
  }
}
