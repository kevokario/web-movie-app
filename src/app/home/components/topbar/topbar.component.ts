import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css','./../sidebar/sidebar.component.css']
})
export class TopbarComponent {
  @Output() toggleEventEmitter: EventEmitter<void> = new EventEmitter<void>();
  @Input() isMobile!:boolean;
  authService = inject(AuthService);
}
