import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, from, map, Observable, tap} from "rxjs";
import {Genre} from "../models/genre";
import {MovieCollection} from "../models/movie";
import {TvSeriesCollection} from "../models/tv-series";
import {SeriesDetail} from "../models/series-detail";
import {MovieDetail} from "../models/movie-detail";
import {addDoc, collection, deleteDoc, doc, Firestore, getDocs, query, where} from "@angular/fire/firestore";
import {AuthService} from "./auth.service";
import {WrapperService} from "../../shared/utils/wrapper.service";
import Swal from 'sweetalert2';
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  baseUrl = environment.tmdbApi.baseUrl;
  private genres$: BehaviorSubject<Genre[]> = new BehaviorSubject<Genre[]>([]);
  private movieWatchList$: BehaviorSubject<MovieDetail[]> = new BehaviorSubject<MovieDetail[]>([]);
  private seriesWatchList$: BehaviorSubject<SeriesDetail[]> = new BehaviorSubject<SeriesDetail[]>([]);

  constructor(
    private http: HttpClient,
    private fireStore: Firestore,
    private authService: AuthService,
    private wrapperService: WrapperService,
  ) { }

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

  getMovieDetails(id: number): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(`${this.baseUrl}/movie/${id}`);
  }

  getTvSeriesDetails(id: number): Observable<SeriesDetail> {
    return this.http.get<SeriesDetail>(`${this.baseUrl}/tv/${id}`);
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

  get movieWatchList() {
    return this.movieWatchList$.asObservable();
  }

  setMovieWatchList(movieDetail:MovieDetail[]) {
    this.movieWatchList$.next(movieDetail);
  }

  get seriesWatchList() {
    return this.seriesWatchList$.asObservable();
  }

  setTvSeriesWatchList(seriesDetail:SeriesDetail[]) {
    this.seriesWatchList$.next(seriesDetail);
  }

  saveToWatchList(user:User | null, movie: MovieDetail | SeriesDetail, type:'movie' |'tv-series'){
    if (!user) {
      this.authService.logout().then();
      return;
    }

    const watchList$ = type === 'movie' ? this.movieWatchList$: this.seriesWatchList$;
    const movieAdded =
      watchList$.value.find(m => m.id === movie.id);
    if (movieAdded) {
      Swal.fire({
        title: 'Error!',
        text: `${type} ${this.getTitle(movie)} is already added`,
        icon: 'error',
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: 'Cancel'
      }).then();
      return ;
    }

    const api$ = type ==='movie' ?
      this.addToMovieWatchList(movie,user):
      this.addToTvSeriesWatchList(movie,user)
    api$.subscribe({
      next:(e)=>{

        Swal.fire({
          title: 'Success!',
          text: `${type} ${this.getTitle(movie)} Successfully added to watchlist!`,
          icon: 'success',
          buttonsStyling:true,
          confirmButtonText:'Continue'
        }).then();
        if(type === 'movie') {
          this.movieWatchList$.next([...this.movieWatchList$.value, e as MovieDetail]);
        } else {
          this.seriesWatchList$.next([...this.seriesWatchList$.value, e as SeriesDetail]);
        }
      },
    } );

  }

  private  addToMovieWatchList(
    movie: MovieDetail | SeriesDetail,
    user:User) {
    const userMovieCollection = collection(this.fireStore, `users/${user.id}/movies`);
    const saveApi$ = from(
      addDoc(userMovieCollection,movie))
      .pipe(
        map(docRef=> {
          return{...
              movie, fire_id:docRef.id
          }
        }),
      );
    return this.wrapperService.wrap( ()=> saveApi$ ) as Observable<any>;

  }
  private  addToTvSeriesWatchList(
    movie: MovieDetail | SeriesDetail,
    user:User) {
    const userSeriesCollection = collection(this.fireStore, `users/${user.id}/tv-series`);
    const saveApi$ = from(
      addDoc(userSeriesCollection,movie))
      .pipe(
        map(docRef=> {
          return{...
              movie, fire_id:docRef.id
          }
        }),
      );
    return this.wrapperService.wrap( ()=> saveApi$ ) as Observable<any>;

  }

  getTitle(movie: MovieDetail | SeriesDetail): string {
    if(!movie){
      return '-';
    }
    return 'title' in movie ? movie.title : movie.name;
  }


  fetchUserMovies(userId: string): Observable<any[]> {
    const userMovieCollection = collection(this.fireStore, `users/${userId}/movies`);

    const fetch$ = from(getDocs(userMovieCollection)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    );

    return this.wrapperService.wrap(() => fetch$) as Observable<any[]>;
  }

  fetchUserTVSeries(userId: string): Observable<any[]> {
    const userMovieCollection = collection(this.fireStore, `users/${userId}/tv-series`);

    const fetch$ = from(getDocs(userMovieCollection)).pipe(
      map(snapshot =>
        snapshot.docs.map(doc => ({ fire_id: doc.id, ...doc.data() })))
    );

    return this.wrapperService.wrap(() => fetch$) as Observable<any[]>;
  }
  deleteFromWatchList(user:User | null, movie: MovieDetail | SeriesDetail, type:'movie' |'tv-series'){
    if (!user) {
      this.authService.logout().then();
      return;
    }

    const fn = type === 'movie'
      ? this.deleteMovie(user.id,movie.id)
      : this.deleteTvSeries(user.id,movie.fire_id);

    fn.subscribe({
      next:(e)=>{
        if(type === 'movie') {
          const updatedRecords  = this.movieWatchList$.value.filter(e=> e.id !== movie.id);
          this.setMovieWatchList(updatedRecords);
        } else {
          const updatedRecords  = this.seriesWatchList$.value.filter(e=> e.id !== movie.id);
          this.setTvSeriesWatchList(updatedRecords);
        }

        Swal.fire({
          title:'Success',
          icon:'success',
          text:`${type} ${this.getTitle(movie)} Removed Successfully`,
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'Continue'
        }).then();
      },error:(e)=>{
        Swal.fire({
          title:'Error',
          icon:'error',
          text:`Failed to removed ${type} ${this.getTitle(movie)}`,
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonText: 'Cancel'
        }).then();
      }
    })
  }
  private deleteMovie(userId: string, movieId: number): Observable<any> {
    const userMovieCollection =
      collection(this.fireStore, `users/${userId}/movies/`);

    return this.wrapperService.wrap(() =>
      from(
        (async () => {
          const q = query(userMovieCollection, where('id', '==', movieId));
          const querySnapshot = await getDocs(q);

          const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
          await Promise.all(deletePromises);

          return { success: true, deletedCount: deletePromises.length };
        })()
      )
    ) as Observable<any>;
  }

  private deleteTvSeries(userId: string, seriesId: string): Observable<any> {
    const userSeriesCollection =
      collection(this.fireStore, `users/${userId}/tv-series/`);

    return this.wrapperService.wrap(() =>
      from(
        (async () => {
          const q = query(userSeriesCollection, where('id', '==', seriesId));
          const querySnapshot = await getDocs(q);

          const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
          await Promise.all(deletePromises);

          return { success: true, deletedCount: deletePromises.length };
        })()
      )
    ) as Observable<any>;  }


}
