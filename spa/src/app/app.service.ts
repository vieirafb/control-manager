import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  _notify: MatSnackBar = inject(MatSnackBar);
  _notifyHorizontalPosition: MatSnackBarHorizontalPosition = 'left';
  _notifyVerticalPosition: MatSnackBarVerticalPosition = 'bottom';

  notify(message: string, durationInSec: number = 5) {
    this._notify.open(message, 'Fechar', {
      horizontalPosition: this._notifyHorizontalPosition,
      verticalPosition: this._notifyVerticalPosition,
      duration: durationInSec * 1000,
    });
  }
}
