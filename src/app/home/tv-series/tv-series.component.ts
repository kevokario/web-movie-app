import {Component, OnInit} from '@angular/core';
import {TvSeriesCollection} from "../../core/models/tv-series";
import {Genre} from "../../core/models/genre";
import {MovieService} from "../../core/services/movie.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-tv-series',
  templateUrl: './tv-series.component.html',
  styleUrl: './tv-series.component.css'
})
export class TvSeriesComponent implements OnInit{
  tvSeriesCollection!: TvSeriesCollection;
  genre!: Genre[];

  pageIndex = 0;
  pageSize = 20;
  totalResults = 0;
  totalPages = 0;

  constructor(
    private movieService: MovieService
  ) {
  }

  ngOnInit() {
    this.loadTvSeries();
    this.initGenres();
  }

  loadTvSeries(){
    this.movieService.getTvSeries(this.pageIndex + 1)
      .subscribe({
        next:(series)=>{
          this.tvSeriesCollection = series;
          this.totalResults = series.total_results;
          this.totalPages = series.total_pages;
        }
      });
  }

  initGenres(){
    this.movieService.genres.subscribe({
      next:(e)=>this.genre = e,
    });
  }

  onPageChange(event: PageEvent){
    this.pageIndex = event.pageIndex + 1;
    this.loadTvSeries();
  }
}
