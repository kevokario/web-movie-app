import {Component, OnInit} from '@angular/core';
import {MovieService} from "../../core/services/movie.service";
import {FormControl} from "@angular/forms";
import {debounce, debounceTime, distinctUntilChanged} from "rxjs";
import {MovieCollection} from "../../core/models/movie";
import {Genre} from "../../core/models/genre";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  searchControl!: FormControl;
  movieCollection!:MovieCollection;
  genres!:Genre[];

  moviePageIndex = 0;
  movieTotalItems = 0;
  movieTotalPages = 0;

  constructor(
    private movieService: MovieService
  ) {
  }

  ngOnInit() {
    this.initGenres();
    this.initSearchField();
  }

  initGenres(){
    this.movieService.genres.subscribe({
      next: (genres)=> this.genres = genres,
    })
  }

  initSearchField(){
    this.searchControl = new FormControl(null);

    this.searchControl.valueChanges.pipe(
      debounceTime(400),
    ).subscribe({
      next: value => {
        if(value) {
          this.searchMovies(value);
        }
      }
    })
  }

  searchMovies(query: string){
    this.movieService.searchMovies(query, this.moviePageIndex + 1).subscribe({
      next:(response)=>{
        this.movieCollection = response;
        this.movieTotalItems = response.total_results
      }
    })
  }

  onMoviePageChange(event: PageEvent){
    this.moviePageIndex = event.pageIndex + 1;
    this.searchControl.setValue(this.searchControl.value, {emitEvent: true});
  }

}
