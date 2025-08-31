import {finalize, Observable} from "rxjs";
import { Injectable} from "@angular/core";
import {LoaderService} from "../services/loader.service";

type FunctionCall<T> = () => Promise<T> | Observable<T>

@Injectable({
  providedIn: "root"
})
export class WrapperService {

  constructor(private loaderService: LoaderService) {
  }

  wrap<T>(fn: FunctionCall<T>): Promise<T> | Observable<T> {
    const r = fn();
    this.loaderService.showLoader();
    return (r instanceof Promise) ?
      r.finally( ()=> this.loaderService.hideLoader() ):
      r.pipe( finalize(() => this.loaderService.hideLoader()) );
  }


}
