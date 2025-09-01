import {Component, OnInit} from '@angular/core';
import {AuthService} from "../core/services/auth.service";
import {MovieService} from "../core/services/movie.service";
import {ResponsiveService} from "../shared/utils/responsive.service";
import {UiService} from "../shared/services/ui.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  isMobile = false;
  constructor(
    public authService: AuthService,
    private responsiveService: ResponsiveService,
    private movieService: MovieService,
  ) {
  }

  ngOnInit() {
    this.initBreakPointObserver();
    this.initGenreList();
    this.initWatchList();
  }

  initBreakPointObserver(){
    this.responsiveService.initBreakPointObserver();
    this.responsiveService.isMobile.subscribe({
      next:(value)=> this.isMobile = value,
    })
  }

  initGenreList(){
    this.movieService.getMovieGenres().subscribe();
  }

  initWatchList(){
    this.authService.loggedInUser.subscribe({
      next:(user)=>{
        if(user){
          this.initUserMovieList(user.id)
          this.initUserTvSeriesList(user.id)
        }
    }
    })
  }

  initUserMovieList(user: string){
    this.movieService.fetchUserMovies(user).subscribe({
      next:(e)=>{
        this.movieService.setMovieWatchList(e);
      }
    })
  }

  initUserTvSeriesList(user: string){
    this.movieService.fetchUserTVSeries(user).subscribe({
      next:(e)=>{
        this.movieService.setTvSeriesWatchList(e);
      }
    })
  }



}
