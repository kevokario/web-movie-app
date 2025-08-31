import {Component, OnInit} from '@angular/core';
import {MovieService} from "../../core/services/movie.service";
import {Movie, MovieCollection} from "../../core/models/movie";
import {Genre} from "../../core/models/genre";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit{
  movieCollection!:MovieCollection;
  movieGenres!:Genre[];
  pageIndex = 0;
  pageSize = 20;
  totalResults = 0;
  totalPages = 0;
  constructor(
    private movieService: MovieService,
  ) {
  }

  ngOnInit() {
    this.initGenres();
    this.loadMovies();
  }

  initGenres(){
    this.movieService.genres.subscribe({
      next:(genres)=>{
         this.movieGenres = genres;
      },
      error:(e)=>{
        console.log(e)
      }
    })
  }

  get movies(): Movie[] {
    return this.movieCollection.results
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.loadMovies();
  }

  loadMovies(){
    this.movieService.getTrendingMovies(this.pageIndex + 1).subscribe({
      next:(e)=>{
        this.movieCollection = e;
        this.totalResults = e.total_results;
        this.totalPages = e.total_pages;
        // this.
      }
    })
  }
}
