import { Component, inject } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";

@Component({
  selector: 'app-product-delete-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './product-delete-dialog.component.html',
  styleUrl: './product-delete-dialog.component.css'
})
export class ProductDeleteDialogComponent {
  readonly data = inject<any>(MAT_DIALOG_DATA);
}
