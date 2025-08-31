import { HttpInterceptorFn } from '@angular/common/http';
import {environment} from "../../../environments/environment";
import {catchError, throwError} from "rxjs";
import {inject} from "@angular/core";
import {UiService} from "../../shared/services/ui.service";

export const tmdbInterceptor: HttpInterceptorFn = (req, next) => {
  const url = req.url;
  let request = req;
  if(url.includes(environment.tmdbApi.baseUrl)){
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization',`Bearer ${environment.tmdbApi.apiKey}`)
    });
    request = clonedRequest;
  }

  const uiService = inject(UiService);

  return next(request).pipe(catchError(err => {
    uiService.showNetworkMessage();
    return throwError(()=> err)
  }));
};
