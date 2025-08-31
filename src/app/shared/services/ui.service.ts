import {Component, Inject, Injectable} from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarRef,
  MatSnackBarVerticalPosition
} from "@angular/material/snack-bar";
import {SharedModule} from "../shared.module";

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private _snackBar: MatSnackBar) { }

  showMessage(
    title: string,
    message: string,
    horizontalPosition: MatSnackBarHorizontalPosition = 'center',
    verticalPosition: MatSnackBarVerticalPosition = 'top'
    ){
    this._snackBar.openFromComponent(UiSnackbarComponent, {
      horizontalPosition,
      verticalPosition,
      duration: 5000,
      data: {
        title,
        message
      }
    })
  }

  showNetworkMessage() {
    this.showMessage('Connection Error','Please check your internet and try again')
  }
}

@Component({
  selector:`app-ui-snackbar`,
  template:`
    <div class="d-flex flex-column">
      <div class="d-flex flex-row">
        <span class="flex-grow-1" matSnackBarLabel>
          <b>{{data.title}}</b>
        </span>
        <span matSnackBarActions>
          <button mat-button matSnackBarAction (click)="snackBarRef.dismissWithAction()">
            <mat-icon>close</mat-icon>
          </button>
        </span>
      </div>
      <div class="pt-0" matSnackBarLabel>{{data.message}}</div>
    </div>
  `,
  standalone: true,
  imports:[SharedModule]
})
export class UiSnackbarComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<UiSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: {title: string, message: string}
    ) {
  }


}

