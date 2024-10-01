import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { CustomTableComponent } from '../../components/custom-table/custom-table.component';
import { IUser } from '../../model/user.interface';
import { getUserList } from '../../store/selectors/user.selector';
import {
  deleteUserActions,
  loadUserActions,
} from '../../store/actions/user.action';
import { IActionBtn, IColumn } from '../../components/interface/table.interface';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, CustomTableComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  #store: Store = inject(Store);
  #router: Router = inject(Router);

  public tableColumn: IColumn<IUser>[] = [
    {
      label: 'ID',
      key: 'id',
    },
    {
      label: 'User Name',
      key: 'userName',
    },
    {
      label: 'First Name',
      key: 'firstName',
    },
    {
      label: 'Last Name',
      key: 'lastName',
    },
    {
      label: 'Is Admin',
      key: 'isAdmin',
      Cell: (row: IUser) => {
        return `<div class='${row?.isAdmin ? 'badge badge-warning' : ''}'>${
          row?.isAdmin ? 'Yes' : 'No'
        }</div>`;
      },
    },
    {
      label: 'Department',
      key: 'department',
    },
  ];

  public userList$: Observable<IUser[] | undefined> = of([]);

  ngOnInit(): void {
    this.fetchData();
  }

  public onAddClick(): void {
    this.#router.navigate(['/user/create']);
  }

  public handleTableAction(val: IActionBtn<IUser>): void {
    switch (val.actionType) {
      case 'edit':
        this.#router.navigate(['/user/edit', val?.value?.id]);
        return;
      case 'view':
        this.#router.navigate(['/user/details', val?.value?.id]);
        return;
      case 'delete':
        this.#store.dispatch(
          deleteUserActions.deleteUser({ id: Number(val?.value?.id ||  '') })
        );
        return;
    }
  }

  private fetchData(): void {
    this.#store.dispatch(loadUserActions.loadUsers());
    this.userList$ = this.#store.select(getUserList);
  }
}
