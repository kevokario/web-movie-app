import {HttpInterceptorFn, HttpResponse} from '@angular/common/http';
import {tap} from "rxjs";
import {inject} from "@angular/core";
import {LoaderService} from "../../shared/services/loader.service";

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  // const loaderService = inject(LoaderService);
  // loaderService.showLoader();
  console.log('Interceptor');
  alert('')
  return next(req);
};
