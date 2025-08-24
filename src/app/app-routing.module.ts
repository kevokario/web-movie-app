import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {authGuard} from "./core/guards/auth.guard";

const routes: Routes = [{
  path: 'auth',
  loadChildren: () => import('./auth/auth.module').then(m =>m.AuthModule)
},{
  path: '',
  redirectTo:'auth',
  pathMatch:'full'
},
  {
    path:'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate:[authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true, })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
