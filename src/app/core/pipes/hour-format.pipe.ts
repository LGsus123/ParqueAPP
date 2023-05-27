import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hourFormat'
})
export class HourFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      const fecha = new Date(value);
      let hora = `${fecha.getHours()}:${fecha.getMinutes()}`;
      
      if (fecha.getHours() < 10) {
        hora = `0${fecha.getHours()}`;
      }
      
      if (fecha.getMinutes() < 10) {
        hora += `:0${fecha.getMinutes()}`;
      } else {
        hora += `:${fecha.getMinutes()}`;
      }
      
      return hora;
    }
    
    return value;
  }
}
