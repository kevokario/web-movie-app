import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";



export class AuthInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = req.url;
    if(url.includes('sign') || url.includes('user')){
      return next.handle(req);
    }
    const token = environment.token;
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    })
    return next.handle(clonedReq);
  }

}
