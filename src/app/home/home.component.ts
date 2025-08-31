import {Component, OnInit} from '@angular/core';
import {AuthService} from "../core/services/auth.service";
import {MovieService} from "../core/services/movie.service";
import {ResponsiveService} from "../shared/utils/responsive.service";

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




}
