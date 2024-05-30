import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'millionDollar',
  standalone: true,
})
export class MillionDollarPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    if (value.length > 0) return `$${value} million`;
    return '-';
  }
}
