import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() color: 'primary' | 'warn' | 'accent' = 'accent';
  @Input() type: 'button'|'submit' = "submit";
  @Input() text: string = '';
  @Input() icon: string | null = null;
  @Input() suffixIcon: string | null = null;
  @Input() btnStyle: 'mat-flat-button' | 'mat-stroked-button' = "mat-flat-button";
}
