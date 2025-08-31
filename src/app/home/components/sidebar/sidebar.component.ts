import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {User} from "../../../core/models/user";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  user!: User;
  @Output() closeEventEmitter: EventEmitter<void> = new EventEmitter<void>();

  constructor( private authService: AuthService) { }

  ngOnInit() {
    this.initLoggedInUser();
  }

  initLoggedInUser(){
    this.authService.loggedInUser.subscribe({
      next:(user) =>{
        if(user ) this.user = user
      }
    })
  }

  closeSideBar(){
    this.closeEventEmitter.emit();
  }
}
