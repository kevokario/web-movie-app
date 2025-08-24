import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../core/services/auth.service";
import {UiService} from "../../shared/services/ui.service";
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit{

  resetForm!: FormGroup;
  isResetSubmit = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private uiService: UiService,
    ) {
  }

  ngOnInit(){
    this.initResetForm();
  }

  initResetForm(){
    this.resetForm = this.formBuilder.group({
      email:[null, [Validators.required, Validators.email]]
    })
  }

  get control() {
    return this.resetForm.controls;
  }

  resetFormSubmit() {
    const form = this.resetForm;
    this.isResetSubmit = true;

    if(form.invalid) {
      return;
    }

    const email = form.value.email;
    this.authService.sendResetPasswordLink(email).subscribe({
      next: _ => {
        this.uiService.showMessage('Success','Reset link sent to your email!');
      },
      error :(_: any)=> this.uiService.showMessage('Error','Failed to send reset password link, Try again later')
    })
  }
}
