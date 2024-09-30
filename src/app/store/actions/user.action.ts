import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IUser } from '../../model/user.interface';

export const loadUserActions = createActionGroup({
  source: 'User',
  events: {
    'Load Users': emptyProps(),
    'Load Users completed': props<{ data: IUser[] }>(),
    'Load Users Failed': props<{ error: string }>(),
  },
});

export const loadUserByIdActions = createActionGroup({
  source: 'User',
  events: {
    'Load User By Id': props<{ id: number }>(),
    'Load User By Id completed': props<{ data: IUser }>(),
    'Load User By Id Failed': props<{ error: string }>(),
  },
});

export const addUserActions = createActionGroup({
  source: 'User',
  events: {
    'Add User': props<{ data: IUser }>(),
    'Add User completed': props<{ data: IUser }>(),
    'Add User Failed': props<{ error: string }>(),
  },
});

export const updateUserActions = createActionGroup({
  source: 'User',
  events: {
    'Update User': props<{ data: IUser }>(),
    'Update User completed': props<{ data: IUser }>(),
    'Update User Failed': props<{ error: string }>(),
  },
});

export const deleteUserActions = createActionGroup({
  source: 'User',
  events: {
    'Delete User': props<{ id: number }>(),
    'Delete User completed': emptyProps(),
    'Delete User Failed': props<{ error: string }>(),
  },
});
