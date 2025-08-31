import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {SearchComponent} from "./search/search.component";
import {MoviesComponent} from "./movies/movies.component";
import {TvSeriesComponent} from "./tv-series/tv-series.component";
import {AnimationsComponent} from "./animations/animations.component";
import {GenresComponent} from "./genres/genres.component";
import {WatchListComponent} from "./watch-list/watch-list.component";

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children:[{
    path:'',
    redirectTo:'dashboard',
    pathMatch:'full'
  },{
    path:'dashboard',
    component:DashboardComponent
  },{
    path:'search',
    component:SearchComponent
  },{
    path:'movies',
    component:MoviesComponent
  },{
    path:'tv-series',
    component: TvSeriesComponent
  },{
    path:'animations',
    component:AnimationsComponent
  },{
    path:'genres',
    component: GenresComponent
  },{
    path:'my-watch-list',
    component: WatchListComponent
  },{
    path:'settings',
    loadChildren: ()=> import('./settings/settings.module').then( m=> m.SettingsModule),
  }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
