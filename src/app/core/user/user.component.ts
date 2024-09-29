import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { CustomTableComponent } from '../../components/custom-table/custom-table.component';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  #appService: AppService = inject(AppService);
  #router: Router = inject(Router);

  public tableColumn: Array<any> = [
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
      Cell: (row: any) => {
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

  public userList: Array<any> = [];

  ngOnInit(): void {
    this.fetchData();
  }

  public onAddClick(): void {
    this.#router.navigate(['/user/create']);
  }

  public handleTableAction(val: any): void {
    switch (val.actionType) {
      case 'edit':
        this.#router.navigate(['/user/edit', val?.value?.id]);
        return;
      case 'view':
        this.#router.navigate(['/user/details', val?.value?.id]);
        return;
      case 'delete':
        this.#appService
          .deleteUserBy(val?.value?.id)
          .pipe(
            map(() => {
              this.fetchData();
            })
          )
          .subscribe();
        return;
    }
  }

  private fetchData(): void {
    this.#appService
      .getUserList()
      .pipe(
        map((res) => {
          this.userList = res;
        })
      )
      .subscribe();
  }
}
