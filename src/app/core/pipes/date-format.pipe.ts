import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {  

  transform(date: string, format: string = 'yyyy-MM-dd'): string {
    return formatDate(date, format, 'en-US');
  }  
}
