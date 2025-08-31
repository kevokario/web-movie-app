import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string | null | undefined, maxLength = 26): string {
    if (!value) {
      return '';
    }
    maxLength < 0 ? maxLength = 29 : maxLength;
    return value.length > maxLength ? value.slice(0, maxLength) + '…' : value
  }

}
