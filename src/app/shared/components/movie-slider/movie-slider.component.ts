import {Component, Input, OnInit} from '@angular/core';
import {Movie} from "../../../core/models/movie";
import {ResponsiveService} from "../../utils/responsive.service";
import {TvSeries} from "../../../core/models/tv-series";
import {Genre} from "../../../core/models/genre";
import {MovieService} from "../../../core/services/movie.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-movie-slider',
  templateUrl: './movie-slider.component.html',
  styleUrl: './movie-slider.component.css',
})
export class MovieSliderComponent implements OnInit{
  @Input() movies:Movie[] | TvSeries[] = [];
  isMobile = false;
  @Input() useFullBackground = true;
  genre!:Genre[];

  constructor(
    private responsiveService: ResponsiveService,
    private movieService: MovieService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.responsiveService.isMobile.subscribe({
      next:(val)=>this.isMobile=val,
    })

    this.movieService.genres.subscribe({
      next:(g)=> this.genre = g,
    })
  }

  getTitle(movie :Movie | TvSeries): string {
    if(!movie){
      return '-';
    }
    return 'title' in movie ? movie.title : movie.name;
  }

  viewMovie(movie: Movie | TvSeries) {
    this.router.navigate(['/home/movie-details',movie.id],{queryParams:{type:'movie'}})
  }
}
