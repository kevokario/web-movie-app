import { Component } from '@angular/core';
import {AuthService} from "../core/services/auth.service";
import {User} from "../core/models/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  users:User[] = [];
  constructor(
    public authService: AuthService
  ) {
  }

  async logout() {
    await this.authService.logout();
  }

  loadUsers(){
    this.authService.getUsers().subscribe({
      next:(e)=>{
        this.users = e;
      }
    })
  }

}
