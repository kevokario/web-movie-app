import {Component, forwardRef, Input, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel} from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: false,
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi:true,
  }]
})
export class InputComponent  implements ControlValueAccessor {

  value:any = null;

  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: 'text'|'password'|'email'|'number' = "text";
  @Input() prefixIcon: string | null = null;
  @Input() surfixIcon: string | null = null;
  @Input() showInputToggle = false;
  hide = true;

  @ViewChild('myInput') inputModel!: NgModel;

  private onChange = (_value: any) => {};
  private onTouched = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }
  onBlur(): void {
    this.onTouched();
    this.inputModel.control.markAsTouched();  }

  writeValue(obj: any): void {
    this.value = obj
  }

  togglePasswordView(){
    this.hide = !this.hide
    this.type = this.type === 'password'?'text':'password'
  }
}
