import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableCell',
  standalone: true
})
export class TableCellPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    // eslint-disable-next-line
    const col :any=  args?.[0];

     // eslint-disable-next-line
    const rowData:any=value;
    return rowData[col.key];
  }

}
