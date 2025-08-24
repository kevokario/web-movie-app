import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  showLoader(){
    this.isLoading$.next(true);
  }

  hideLoader(){
    this.isLoading$.next(false)
  }

  getLoadingStatus(){
    return this.isLoading$.asObservable();
  }
}
