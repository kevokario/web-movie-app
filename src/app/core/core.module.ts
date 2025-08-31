import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UrlSanitizerPipe} from "./pipes/url-sanitizer.pipe";
import { TruncatePipe } from './pipes/truncate.pipe';



@NgModule({
  declarations: [UrlSanitizerPipe, TruncatePipe],
  imports: [
    CommonModule
  ],
  exports: [
    UrlSanitizerPipe, TruncatePipe
  ]
})
export class CoreModule { }
