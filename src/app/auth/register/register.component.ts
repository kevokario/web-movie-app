import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  registerForm!:FormGroup;
  isRegisterSubmit = false;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initRegisterForm();
  }

  initRegisterForm(){
    this.registerForm = this.formBuilder.group({
      name: [null,[Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]]
    });
  }

  get control() {
    return this.registerForm.controls;
  }

  registerFormSubmit() {
    const form = this.registerForm;
    this.isRegisterSubmit = true;

    if(form.invalid){
      return;
    }

    console.log(form.value)
  }
}
