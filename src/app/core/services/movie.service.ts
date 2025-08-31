import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, forkJoin, map, Observable, tap} from "rxjs";
import {Genre} from "../models/genre";
import {Movie, MovieCollection} from "../models/movie";
import {TvSeriesCollection} from "../models/tv-series";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  baseUrl = environment.tmdbApi.baseUrl;
  private genres$: BehaviorSubject<Genre[]> = new BehaviorSubject<Genre[]>([]);

  constructor( private http: HttpClient) { }

  getTrendingMovies(page = 1): Observable<MovieCollection> {
    return this.http.get<MovieCollection>(`${this.baseUrl}/trending/movie/week?page=${page}`);
  }
  getLatestMovies(){
    const today = new Date();
    const last60 = new Date();
    last60.setDate(today.getDate() - 60);

    const formatDate = (d: Date) => d.toISOString().split('T')[0];
    const todayStr = formatDate(today);
    const last30Str = formatDate(last60);
    const params = new URLSearchParams();
    params.set('primary_release_date.gte',last30Str);
    params.set('primary_release_date.lte',todayStr);
    return this.http.get<MovieCollection>(`${this.baseUrl}/discover/movie?${params.toString()}`)
      .pipe(map( response =>{
        response.results = response.results.filter( m=> m.backdrop_path !== null)
        return response;
      }));

  }

  getMovieGenres(): Observable<Genre[]>{
    return this.http.get(`${this.baseUrl}//genre/movie/list`).pipe(
      map((genres:any) => genres.genres),
      tap({
        next:(genres)=>{
          this.genres$.next(genres);
        }
      })
    )
  }

  get genres() {
    return this.genres$.asObservable();
  }

  searchMovies(query: string, page = 1): Observable<MovieCollection> {
    return this.http.get<MovieCollection>(`${this.baseUrl}/search/movie?query=${query}&page=${page}`);
  }

  searchTvSeries(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/tv?query=${query}`);
  }

  getMovieDetails(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${id}`);
  }

  discoverMoviesByGenres(genreIds: number[], page = 1): Observable<MovieCollection> {
    const genresParam = genreIds.join(',');
    const url = `${this.baseUrl}/discover/movie?with_genres=${genresParam}&page=${page}`;


    return this.http.get<MovieCollection>(url)

  }
  discoverTvSeriesByGenres(genreIds: number[], page = 1): Observable<TvSeriesCollection> {
    const genresParam = genreIds.join(',');
    const url = `${this.baseUrl}/discover/tv?with_genres=${genresParam}&page=${page}`;

    return this.http.get<TvSeriesCollection>(url)
  }


  getAnimatedMovies(page = 1): Observable<MovieCollection> {
    return this.http.get<MovieCollection>(`${this.baseUrl}/discover/movie?with_genres=16&page=${page}`);
  }

  getTvSeries(page = 1): Observable<TvSeriesCollection> {
    return this.http.get<TvSeriesCollection>(
      `${this.baseUrl}/discover/tv?page=${page}`
    );
  }

}
