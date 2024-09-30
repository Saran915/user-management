import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserResponse } from '../../model/user.interface';

const getUserState = createFeatureSelector<IUserResponse>('user');

export const getUserList = createSelector(getUserState, (state) => {
  return state.data;
});

export const getUserCreateResponse = createSelector(getUserState, (state) => {
  return state.getDetail;
});

export const getUserError = createSelector(getUserState, (state) => {
  return state.error;
});

export const getUserDetail = createSelector(getUserState, (state) => {
  return state.getDetail;
});
