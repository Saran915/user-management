import { FormControl } from '@angular/forms';

export interface IUser {
  id: number | null;
  userName: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  department: string;
}

export const userInitialValue: IUser = {
  id: null,
  userName: '',
  firstName: '',
  lastName: '',
  isAdmin: false,
  department: '',
};

export interface IUserResponse {
  data: IUser[] | undefined;
  getDetail: IUser | undefined;
  error: string;
}

export const userState: IUserResponse = {
  data: [],
  getDetail: undefined,
  error: '',
};

export interface IUserForm {
  id: FormControl<number | null>;
  userName: FormControl<string>;
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  isAdmin: FormControl<boolean>;
  department: FormControl<string>;
}
