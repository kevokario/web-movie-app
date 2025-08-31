import {CanActivateFn, Router} from '@angular/router';
import {environment} from "../../../environments/environment";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {User} from "../models/user";

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem(environment.token);
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = localStorage.getItem(environment.user);

  if(user && token){
    const _user:User = JSON.parse(user) as User;
    authService.loggedInUser = _user;
    return true;
  }
  router.navigate(['/']).then();
  return false;
};
