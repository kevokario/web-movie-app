import {Component, OnInit} from '@angular/core';
import {Genre} from "../../core/models/genre";
import {MovieCollection} from "../../core/models/movie";
import {MovieService} from "../../core/services/movie.service";
import {combineLatest} from "rxjs";
import {TvSeriesCollection} from "../../core/models/tv-series";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  latestMovieCollection!:MovieCollection;
  trendingMovieCollection!:MovieCollection;
  tvSeriesCollection!:TvSeriesCollection;
  animationCollection!:MovieCollection;
  genres!:Genre[];
  constructor(
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.initMovies();
  }

  initMovies(){
    const latestMovieCollection$ = this.movieService.getLatestMovies();
    const genres$ = this.movieService.genres;
    const trendingMovies$ = this.movieService.getTrendingMovies();
    const tvSeries$ = this.movieService.getTvSeries();
    const animations$ = this.movieService.getAnimatedMovies();
    combineLatest([
      genres$,
      latestMovieCollection$,
      trendingMovies$,
      tvSeries$,
      animations$,
    ]).subscribe({
      next:(
        [
          genres,
          latestMovieCollection,
          trendingMovies,
          tvSeries,
          animations
        ])=>{
        if (genres){
          this.genres = genres;
        }

        if(latestMovieCollection){
          this.latestMovieCollection = latestMovieCollection;
        }

        if(trendingMovies){
          this.trendingMovieCollection = trendingMovies;
        }

        if(tvSeries){
          this.tvSeriesCollection = tvSeries;
        }

        if(animations){
          this.animationCollection = animations;
        }
      },
      error:(e)=>{
        console.log(e)
      }
    })
  }




}
