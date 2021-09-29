import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(records: Array<any>, args?: any): any {
    if (typeof args === 'object') {

      let dir = args.direction < 0 ? -1 : 1

      return records.sort((a, b) => {
        return dir * OrderByPipe.compare(a[args.property], b[args.property]);
      });

    } else if (typeof args === 'string') {
      return records.sort((a, b) => {
        return OrderByPipe.compare(a[args], b[args]);
      });
    } else {
      return records;
    }
  }

  static compare(a: string, b: string): number;
  static compare(a: number, b: number): number;
  static compare(a: object, b: object): number;
  static compare(a: number | string | object, b: number | string | object): number {
    if (typeof a === 'string' && typeof b === 'string') return a.localeCompare(b, undefined, { sensitivity: 'base' });
    if (typeof a === 'number' && typeof b === 'number') return a - b;
    if (typeof a === 'object' && typeof b === 'object') {
      if (a > b) return 1;
      if (a == b) return 0;
      if (a < b) return -1;
    };
  }
}
