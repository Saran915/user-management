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
import { IActionBtn } from '../interface/table.interface';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [],
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.scss',
})
export class CustomTableComponent implements OnInit, OnChanges {
  private filterValue$ = new Subject<string>();
  @Input({ required: true }) public rowDatas: Array<any> = [];
  @Input({ required: true }) public columns: Array<any> = [];
  @Input() public showAction: boolean = true;

  public originalRowData: Array<any> = [];

  @Output() public actionEmitter: EventEmitter<IActionBtn> =
    new EventEmitter<IActionBtn>();

  ngOnInit() {
    this.filterSubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.originalRowData = changes?.['rowDatas']?.currentValue || [];
  }

  public onActionBtnClick(value: any, actionType: string): void {
    this.actionEmitter.emit({ value, actionType });
  }

  public filterSubscribe(): void {
    this.filterValue$
      ?.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map((res) => {
          this.rowDatas = this.originalRowData?.filter((el) =>
            Object.values(el).some((value) =>
              String(value).toLowerCase().includes(res.toLowerCase())
            )
          );
        })
      )
      .subscribe();
  }

  public filterTableData(event: any): void {
    this.filterValue$.next(event?.target?.value);
  }
}
