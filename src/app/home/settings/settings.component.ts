import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {User} from "../../core/models/user";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit{
  user:User | null = null;
  constructor(
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.authService.loggedInUser.subscribe({
      next:(e)=>this.user = e
    })
  }

}
