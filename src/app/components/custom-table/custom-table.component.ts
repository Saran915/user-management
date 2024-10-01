import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { debounceTime, distinctUntilChanged, map, Subject } from 'rxjs';
import { IActionBtn, IColumn } from '../interface/table.interface';
import { TableCellPipe } from '../pipe/table-cell.pipe';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [TableCellPipe],
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.scss',
})
export class CustomTableComponent<T> implements OnInit, OnChanges {
  private filterValue$ = new Subject<string>();
  @Input({ required: true }) public rowDatas: T[] = [];
  @Input({ required: true }) public columns: IColumn<T>[] = [];
  @Input() public showAction = true;

  public originalRowData: T[] = [];

  @Output() public actionEmitter: EventEmitter<IActionBtn<T>> =
    new EventEmitter<IActionBtn<T>>();

  ngOnInit() {
    this.filterSubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.originalRowData = changes?.['rowDatas']?.currentValue || [];
  }

  public onActionBtnClick(value: T, actionType: string): void {
    this.actionEmitter.emit({ value, actionType });
  }

  public filterSubscribe(): void {
    this.filterValue$
      ?.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map((res) => {
          this.rowDatas = this.originalRowData?.filter((el) =>
            Object.values(el as Record<string, T>).some((value) =>
              String(value).toLowerCase().includes(res.toLowerCase())
            )
          );
        })
      )
      .subscribe();
  }

  public filterTableData(event: Event): void {
    this.filterValue$.next((event?.target  as HTMLInputElement)?.value);
  }
}
