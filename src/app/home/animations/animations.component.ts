import {Component, OnInit} from '@angular/core';
import {MovieService} from "../../core/services/movie.service";
import {MovieCollection} from "../../core/models/movie";
import {combineLatest} from "rxjs";
import {Genre} from "../../core/models/genre";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-animations',
  templateUrl: './animations.component.html',
  styleUrl: './animations.component.css'
})
export class AnimationsComponent implements OnInit{

  animationCollection!:MovieCollection;
  genre!: Genre[];
  pageIndex = 0;
  pageSize = 20;
  totalResults = 0;
  totalPages = 0;

  constructor(
    private movieService: MovieService,
  ) {
  }

  ngOnInit() {
    this.loadAnimations();
    this.initAnimations();
  }

  loadAnimations(){
    this.movieService.getAnimatedMovies(this.pageIndex + 1).subscribe({
      next: (collection)=>{
        this.animationCollection = collection;
        this.totalResults = collection.total_results;
        this.totalPages = collection.total_pages;
      }
    })
  }

  initAnimations() {
    this.movieService.genres .subscribe({
      next:(genre)=>{
        this.genre = genre;
      }
    })
  }

  onPageChange(event: PageEvent){
    this.pageIndex = event.pageIndex + 1;
    this.loadAnimations();
  }
}
