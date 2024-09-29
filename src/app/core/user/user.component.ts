import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomTableComponent } from '../../components/custom-table/custom-table.component';

interface IUserForm {
  id: FormControl<number | null>;
  userName: FormControl<string>;
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  isAdmin: FormControl<boolean>;
  department: FormControl<string>;
}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomTableComponent,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  public isModalOpen: boolean = false;
  public departmentList = ['Marketing', 'Management', 'Maintenance'];

  public tableColumn: Array<any> = [
    {
      label: 'ID',
      key: 'id',
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
      label: 'User Name',
      key: 'userName',
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

  public userList: Array<any> = [
    {
      id: '1',
      firstName: 'Ram',
      lastName: 'Khadka',
      userName: 'khadka_ram',
      isAdmin: true,
      department: 'Management',
    },
    {
      id: '2',
      firstName: 'Shyam',
      lastName: 'Karki',
      userName: 'karki_shyam',
      isAdmin: false,
      department: 'Marketing',
    },
  ];

  public formType: 'create' | 'view' | 'edit' | 'delete' = 'create';

  public userForm = new FormGroup<IUserForm>({
    id: new FormControl(null),
    userName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    firstName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    lastName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    isAdmin: new FormControl(false, { nonNullable: true }),
    department: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  handleTableAction(val: any): void {
    this.userForm.patchValue({ ...val?.value });
    if (val.actionType === 'delete') {
      this.userList = this.userList?.filter((el) => el?.id !== val?.value?.id);
    } else {
      this.openForm(val.actionType);
    }
  }

  openForm(val: string, isFormReset: boolean = false): void {
    this.userForm.enable();
    if (isFormReset) {
      this.userForm.reset();
    }
    if (val === 'view') {
      this.userForm.disable();
    }
    this.isModalOpen = true;
    this.formType = val as 'create' | 'view' | 'edit' | 'delete';
  }

  onFormSubmit(): void {
    this.userForm.markAllAsTouched();
    if (this.userForm.valid) {
      const formObj = this.userForm.getRawValue();
      if (!formObj['id']) {
        this.userList = this.userList?.filter((el) => el?.id !== formObj?.id);
      }
      this.userList = [...this.userList, formObj];
      this.isModalOpen = false;
    }
  }

  isFormFieldInvalid(formControlName: string): boolean {
    const val: boolean = false;
    if (
      this.userForm.get(formControlName)?.dirty ||
      this.userForm.get(formControlName)?.touched
    ) {
      return !!this.userForm.get(formControlName)?.errors;
    }
    return val;
  }
}
