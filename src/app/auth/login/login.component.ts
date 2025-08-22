import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{
  hide = true;

  loginForm!: FormGroup;
  isLoginSubmit = false;
  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(){
    this.initLoginForm();
  }

  initLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]]
    })
  }

  get control(){
    return this.loginForm.controls;
  }

  loginFormSubmit(){
    const form = this.loginForm;
    this.isLoginSubmit = true;

    if(this.loginForm.invalid){
      return;
    }
    // do some firebase authentication
    console.log(form.value)
  }

}
