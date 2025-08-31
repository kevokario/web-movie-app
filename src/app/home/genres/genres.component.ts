import {Component, OnInit} from '@angular/core';
import {MovieService} from "../../core/services/movie.service";
import {Genre} from "../../core/models/genre";
import {MatChipListboxChange} from "@angular/material/chips";
import {MovieCollection} from "../../core/models/movie";
import {TvSeriesCollection} from "../../core/models/tv-series";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.css'
})
export class GenresComponent implements OnInit{

  genres!:Genre[];
  selectedGenreIds:number[] = [];
  movieCollection!:MovieCollection;
  seriesCollection!:TvSeriesCollection;
  moviePageIndex = 1;
  seriesPageIndex = 1;
  constructor(
    private movieService: MovieService
  ) {
  }

  ngOnInit() {
    this.initGenres();
    this.loadByGenres();

  }

  initGenres(){
    this.movieService.genres.subscribe({
      next:(genres)=> this.genres = genres,
    })
  }

  loadByGenres(){
    this.loadMoviesByGenre();
    this.loadSeriesByGenre();
  }

  loadMoviesByGenre(){
    this.movieService.discoverMoviesByGenres(this.selectedGenreIds, this.moviePageIndex).subscribe({
      next:(result)=>this.movieCollection = result,
    });
  }

  loadSeriesByGenre(){
    this.movieService.discoverTvSeriesByGenres(this.selectedGenreIds, this.seriesPageIndex).subscribe({
      next:(result)=>this.seriesCollection = result,
    });
  }

  onSelectionChange(event: MatChipListboxChange) {
    this.selectedGenreIds= event.value;
    this.loadByGenres();
  }

  onMoviePageChange(event: PageEvent) {
    this.moviePageIndex = event.pageIndex + 1;
    this.loadMoviesByGenre();
  }

  onSeriesPageChange(event: PageEvent) {
    this.seriesPageIndex = event.pageIndex + 1;
    this.loadSeriesByGenre();
  }
}
