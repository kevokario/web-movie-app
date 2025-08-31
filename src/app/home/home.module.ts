import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { NgOptimizedImage} from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {SharedModule} from "../shared/shared.module";
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchComponent } from './search/search.component';
import { MoviesComponent } from './movies/movies.component';
import { TvSeriesComponent } from './tv-series/tv-series.component';
import { AnimationsComponent } from './animations/animations.component';
import { GenresComponent } from './genres/genres.component';
import { WatchListComponent } from './watch-list/watch-list.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MovieDetailsComponent } from './movie-details/movie-details.component';


@NgModule({
  declarations: [
    HomeComponent,
    SidebarComponent,
    TopbarComponent,
    DashboardComponent,
    SearchComponent,
    MoviesComponent,
    TvSeriesComponent,
    AnimationsComponent,
    GenresComponent,
    WatchListComponent,
    MovieDetailsComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        SharedModule,
        HomeRoutingModule,
        NgOptimizedImage,
    ]
})
export class HomeModule { }
