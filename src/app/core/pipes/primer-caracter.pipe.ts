import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'primerCaracter'
})
export class PrimerCaracterPipe implements PipeTransform {  
  transform(value: string): string {
    if (value) {
      return value.charAt(0);
    }
    return '';
  }
}