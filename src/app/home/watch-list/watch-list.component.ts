import {Component, OnInit} from '@angular/core';
import {MovieService} from "../../core/services/movie.service";
import {MovieDetail} from "../../core/models/movie-detail";
import {SeriesDetail} from "../../core/models/series-detail";
import {combineLatest} from "rxjs";

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrl: './watch-list.component.css'
})
export class WatchListComponent implements OnInit{
  favoriteMovies!:MovieDetail[];
  favoriteTvSeries!:SeriesDetail[];
  constructor(private movieService: MovieService) {
  }

  ngOnInit() {
    this.initFavorites();
  }

  initFavorites(){
    const movies$ = this.movieService.movieWatchList;
    const series$ = this.movieService.seriesWatchList;
    combineLatest(
      [
        movies$,
        series$
    ]).subscribe({
      next:([
        movies,
        series,
      ])=>{
        if(movies){
          this.favoriteMovies = movies;
        }
        if(series) {
          this.favoriteTvSeries = series;
        }
      }
    })
  }
  removeFromFavorites(movie:MovieDetail | SeriesDetail, type: 'movie'|'tv-series'){
    this.movieService.deleteFromWatchList(movie,type==='movie'?'movie':'tv-series');
  }

}
