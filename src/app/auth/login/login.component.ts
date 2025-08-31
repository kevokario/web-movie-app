import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../core/models/user";
import {AuthService} from "../../core/services/auth.service";
import {UiService} from "../../shared/services/ui.service";
import { FirebaseError } from 'firebase/app';
import {finalize} from "rxjs";
import {LoaderService} from "../../shared/services/loader.service";


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
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private uiService: UiService,
    private loaderService: LoaderService
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
    const user: User  = form.getRawValue() as User;
    // this.loaderService.showLoader();
    this.authService.login(user).pipe(
      // finalize(() => {this.loaderService.hideLoader()})
    ).subscribe({
      error:(err:FirebaseError) => {
        const message = err.code.includes('credential') ?'Invalid email/password': err.code;
        this.uiService.showMessage('Error',message);
      },
    })
  }
  loginWithGmail(){

    this.authService.loginWithGoogle()
      .pipe(
      ).subscribe({
      error:()=>{
      this.uiService.showNetworkMessage();
    }

    })
  }

}
