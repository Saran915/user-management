import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { AppService } from '../../services/app.service';
import {
  addUserActions,
  deleteUserActions,
  loadUserActions,
  loadUserByIdActions,
  updateUserActions,
} from '../actions/user.action';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  #actions: Actions = inject(Actions);
  #router: Router = inject(Router);
  #appService: AppService = inject(AppService);

  _loadUser$ = createEffect(() =>
    this.#actions.pipe(
      ofType(loadUserActions.loadUsers),
      exhaustMap(() => {
        return this.#appService.getUserList().pipe(
          map((res) => {
            return loadUserActions.loadUsersCompleted({ data: res });
          }),
          catchError((err) => {
            return of(loadUserActions.loadUsersFailed({ error: err.message }));
          })
        );
      })
    )
  );

  _loadUserById$ = createEffect(() =>
    this.#actions.pipe(
      ofType(loadUserByIdActions.loadUserById),
      switchMap((action) => {
        return this.#appService.getUserBy(action.id).pipe(
          map((data) => {
            return loadUserByIdActions.loadUserByIdCompleted({ data });
          }),
          catchError((err) =>
            of(loadUserByIdActions.loadUserByIdFailed({ error: err.message }))
          )
        );
      })
    )
  );

  _createUser$ = createEffect(() =>
    this.#actions.pipe(
      ofType(addUserActions.addUser),
      switchMap((action) => {
        return this.#appService.createUser(action.data).pipe(
          map((data) => {
            this.#router.navigate(['/user']);
            return addUserActions.addUserCompleted({ data });
          }),
          catchError((err) =>
            of(addUserActions.addUserFailed({ error: err.message }))
          )
        );
      })
    )
  );

  _updateUser$ = createEffect(() =>
    this.#actions.pipe(
      ofType(updateUserActions.updateUser),
      switchMap((action) => {
        return this.#appService.updateUser(action.data).pipe(
          map((data) => {
            this.#router.navigate(['/user']);
            return updateUserActions.updateUserCompleted({ data });
          }),
          catchError((err) =>
            of(updateUserActions.updateUserFailed({ error: err.message }))
          )
        );
      })
    )
  );

  _deleteUserById$ = createEffect(() =>
    this.#actions.pipe(
      ofType(deleteUserActions.deleteUser),
      switchMap((action) => {
        return this.#appService.deleteUserBy(action.id).pipe(
          map(() => {
            return deleteUserActions.deleteUserCompleted();
          }),
          catchError((err) =>
            of(deleteUserActions.deleteUserFailed({ error: err.message }))
          )
        );
      })
    )
  );
}
