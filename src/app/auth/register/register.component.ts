import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../core/services/auth.service";
import {User} from "../../core/models/user";
import {UiService} from "../../shared/services/ui.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  registerForm!:FormGroup;
  isRegisterSubmit = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private uiService: UiService,
    ) {
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

    const user: User = form.value as User;

    this.authService.register(user).then()
      .catch((e)=> {
        let message = e.code.includes('email-already') ?' email Already in use': e.code;
        this.uiService.showMessage('Error',message);
      })
  }
}
