import { Injectable } from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  private isMobile$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private breakPointObserver: BreakpointObserver) { }

  initBreakPointObserver() {
    this.breakPointObserver.observe([Breakpoints.Handset, Breakpoints.Small]).subscribe({
      next:(breakPoint)=> this.isMobile$.next(breakPoint.matches)
    })
  }

  get isMobile(): Observable<boolean> {
    return this.isMobile$.asObservable();
  }


}
