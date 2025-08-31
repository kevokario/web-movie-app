import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {environment} from "../environments/environment";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors} from "@angular/common/http";
import {loaderInterceptor} from "./core/interceptors/loader.interceptor";
import {SharedModule} from "./shared/shared.module";
import {tmdbInterceptor} from "./core/interceptors/tmdb.interceptor";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { UrlSanitizerPipe } from './core/pipes/url-sanitizer.pipe';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    provideFirebaseApp(() => initializeApp({...environment.firebase})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([loaderInterceptor, tmdbInterceptor]))
  ],
  exports: [],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
