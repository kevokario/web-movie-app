import { Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer,  SafeStyle, SafeUrl} from "@angular/platform-browser";
import {environment} from "../../../environments/environment";

@Pipe({
  name: 'urlSanitizer'
})
export class UrlSanitizerPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) {
  }

  transform(
    value: string | null | undefined,
    type: 'style'|'image' = 'image',
    includeUrl = true,
    size:'w154' | 'w185'  | 'w300' | 'w500' | 'w780' | 'original' = 'w500'
  ): SafeUrl | SafeStyle {

    const fn = type === "image" ? this.domSanitizer.bypassSecurityTrustResourceUrl : this.domSanitizer.bypassSecurityTrustStyle
    if(!value){
      return fn('')
    }
    const url = includeUrl ? `${environment.tmdbApi.imageUrl}/${size}${value}`:value;
    return fn( type=='style' ? `url('${url}')`:url);

  }

}

@Pipe({
  name: 'styleSanitizer'
})
export class StyleSanitizerPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) {
  }

  transform(value: string | null | undefined, includeUrl = true, size = 'w500'):  SafeStyle {
    if(!value){
      return this.domSanitizer.bypassSecurityTrustStyle('')
    }
    const url = includeUrl ? `${environment.tmdbApi.imageUrl}/${size}${value}`:value;
    const cssUrl = `url('${url}')`;  // wrap with url()
    return this.domSanitizer.bypassSecurityTrustStyle(cssUrl);

  }

}
