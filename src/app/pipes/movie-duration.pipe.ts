import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieDuration',
  standalone: true,
})
export class MovieDurationPipe implements PipeTransform {
  transform(duration: string, ...args: unknown[]): unknown {
    let numericalDuration = Number(duration);
    if (!isNaN(numericalDuration)) {
      return `${Math.floor(numericalDuration / 60)}h ${
        numericalDuration % 60
      }min`;
    }

    return '-';
  }
}
