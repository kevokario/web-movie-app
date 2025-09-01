import {Component, OnInit} from '@angular/core';
import {MovieService} from "../../core/services/movie.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MovieDetail} from "../../core/models/movie-detail";
import {SeriesDetail} from "../../core/models/series-detail";
import {ResponsiveService} from "../../shared/utils/responsive.service";
import {combineLatest} from "rxjs";
import {AuthService} from "../../core/services/auth.service";
import {User} from "../../core/models/user";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit{
  isMovieView = true;
  movieDetail!: MovieDetail | SeriesDetail;
  movieWatchLists!:MovieDetail[];
  tvSeriesWatchLists!:SeriesDetail[];
  isMobile = false;
  user!:User | null
  constructor(
    private movieService:MovieService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private responsiveService: ResponsiveService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.initUser();
    this.initIsMobile();
    this.initRoute();
    this.initWatchLists();
  }

  initUser(){
    this.authService.loggedInUser.subscribe({
      next:(e)=> this.user = e,
    })
  }


  initIsMobile(){
    this.responsiveService.isMobile.subscribe({
      next:( isMobile) => this.isMobile = isMobile,
    })
  }

  initRoute(){
    const id = this.activatedRoute.snapshot.params['id'];
    this.activatedRoute.queryParams.subscribe({
      next:async (el)=>{
        if(el['type'] && (el['type']=='movie' || el['type']==='tv-series')) {
          this.isMovieView = el['type'] === 'movie';
          this.loadMovieDetails(id);
        } else {
          await this.router.navigate(['/home'])
        }
      }
    })
  }

  loadMovieDetails(id: number){
    this.isMovieView
      ? this.loadMovieDetail(id)
      : this.loadSeriesDetail(id);
  }

  loadMovieDetail(id: number) {
    this.movieService.getMovieDetails(id).subscribe({
      next:(r)=> this.movieDetail = r,
    })
  }

  loadSeriesDetail(id: number) {
    this.movieService.getTvSeriesDetails(id).subscribe({
      next:(r)=> this.movieDetail = r,
    })
  }

  initWatchLists(){
    combineLatest([
      this.movieService.movieWatchList,
      this.movieService.seriesWatchList
    ]).subscribe({
      next:([
              movies,series
            ])=>{
        if(movies) this.movieWatchLists = movies;
        if(series) this.tvSeriesWatchLists = series;
      }
    })
  }

  get title(): string {
    const movie = this.movieDetail;
    if(!movie){
      return '-';
    }
    return 'title' in movie ? movie.title : movie.name;
  }

  get addedToWatchList(): boolean {
    const movie = this.movieDetail;
    if(!movie){
      return false;
    }
    const type = this.activatedRoute.snapshot.queryParams['type'];

    const list =  type === 'movie' ? this.movieWatchLists: this.tvSeriesWatchLists;
    // console.log(type,list)
    const index= list.findIndex(e=> e.id === movie.id);
    return index > -1;
  }
  onImgError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/poster-placeholder.png';
  }

  addToFavorites(){
    const type = this.activatedRoute.snapshot.queryParams['type'];
       this.movieService.saveToWatchList(this.user,this.movieDetail,type==='movie'?'movie':'tv-series')
  }
  removeFromFavorites(){
    const type = this.activatedRoute.snapshot.queryParams['type'];
      this.movieService.deleteFromWatchList(this.user,this.movieDetail,type==='movie'?'movie':'tv-series');
  }
}
