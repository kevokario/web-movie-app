import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit{

  resetForm!: FormGroup;
  isResetSubmit = false;
  constructor(private formBuilder: FormBuilder) {
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

    if(form.invalid) {
      return;
    }

    console.log('welcome. reset passord')
  }
}
