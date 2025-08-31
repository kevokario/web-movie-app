import {HttpInterceptorFn} from '@angular/common/http';
import {finalize} from "rxjs";
import {inject} from "@angular/core";
import {LoaderService} from "../../shared/services/loader.service";

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  loaderService.showLoader();
  return next(req).pipe(finalize( ()=>loaderService.hideLoader() ));
};
