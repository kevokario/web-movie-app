import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Movie} from "../../../core/models/movie";
import {Genre} from "../../../core/models/genre";
import {TvSeries} from "../../../core/models/tv-series";
import {Router} from "@angular/router";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent implements OnChanges{

  @Input() genres!: Genre[];
  @Input() showMovieType = false;
  @Input() movie !:Movie | TvSeries;
  @Input() imageSize: 'w154' | 'w185' | 'w300' | 'w500' | 'w780' | 'original' = 'w185';
  @Input() showMovieGenre = true;
  @Input() isMobile = false;
  @Input() showActionButtons = true;

  constructor(
    private router:Router
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes){

      if(changes['isMobile'] && !changes['imageSize']) {
        this.imageSize =  (this.isMobile) ? 'w185' : 'w300'
      }
    }
  }

  getGenre(movie: Movie|TvSeries): Genre  {
    const genreId = movie.genre_ids.find(id => this.genres.some(g => g.id === id));
    const genre = this.genres.find(g => g.id === genreId);
    return genre ?? {name: '-'} as Genre;
  }
  get title(): string {
    const movie = this.movie;
    if(!movie){
      return '-';
    }
    return 'title' in movie ? movie.title : movie.name;
  }

  get mediaType(): string{
    const movie = this.movie;
    if(!movie){
      return  '-';
    }
    return 'title' in movie ? movie.media_type : 'Tv Series'
  }

  onImgError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/poster-placeholder.png';
  }

  async viewDetails(){
    const isMovie = 'title' in this.movie;
    await this.router.navigate([
      '/home/movie-details',this.movie.id
    ],{
      queryParams:{
        type:isMovie ? 'movie':'tv-series'
      }
    });
  }
}
