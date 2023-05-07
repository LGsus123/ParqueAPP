import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hourFormat'
})
export class HourFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      const fecha = new Date(value);
      const hora = `${fecha.getHours()}:${fecha.getMinutes()}`;
      return hora;
    }
    return value;
  }

}
