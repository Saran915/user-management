import { createReducer, on } from '@ngrx/store';
import { userState } from '../../model/user.interface';
import {
  addUserActions,
  deleteUserActions,
  loadUserActions,
  loadUserByIdActions,
  updateUserActions,
} from '../actions/user.action';

export const userReducer = createReducer(
  userState,
  on(loadUserActions.loadUsersCompleted, (state, action) => {
    return {
      ...state,
      data: action.data,
      getDetail: undefined,
      error: '',
    };
  }),
  on(loadUserByIdActions.loadUserByIdCompleted, (state, action) => {
    return {
      ...state,
      data: [],
      getDetail: action.data,
      error: '',
    };
  }),
  on(addUserActions.addUserCompleted, (state, action) => {
    return {
      ...state,
      data: [],
      getDetail: action.data,
      error: '',
    };
  }),
  on(updateUserActions.updateUserCompleted, (state, action) => {
    return {
      ...state,
      data: [],
      getDetail: action.data,
      error: '',
    };
  }),
  on(deleteUserActions.deleteUserCompleted, (state, action) => {
    return {
      ...state,
      data: [],
      getDetail: undefined,
      error: '',
    };
  })
);
