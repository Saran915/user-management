import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { IUserForm } from '../../../model/user.interface';
import {
  addUserActions,
  loadUserByIdActions,
  updateUserActions,
} from '../../../store/actions/user.action';
import { getUserDetail } from '../../../store/selectors/user.selector';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit {
  #store: Store = inject(Store);
  #router: Router = inject(Router);
  #activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  public departmentList = ['Marketing', 'Management', 'Maintenance'];
  public pageName: WritableSignal<string> = signal('create');

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

  constructor() {
    this.#activatedRoute.params
      .pipe(
        map((res) => {
          if (Object?.values(res).length) {
            return this.#store.dispatch(
              loadUserByIdActions.loadUserById({ id: res['userId'] })
            );
          }
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.getPageName();
    this.fetchDetail();
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

  onFormSubmit(): void {
    this.userForm.markAllAsTouched();
    if (this.userForm.valid) {
      const formObj = this.userForm.getRawValue();
      if (!formObj['id']) {
        this.#store.dispatch(
          addUserActions.addUser({ data: { ...formObj, id: Date.now() } })
        );
      } else {
        this.#store.dispatch(updateUserActions.updateUser({ data: formObj }));
      }
    }
  }

  public onBackClick(): void {
    this.#router.navigate(['/user']);
  }

  private fetchDetail(): void {
    this.#store
      .select(getUserDetail)
      .pipe(
        map((res) => {
          this.userForm.patchValue({ ...res });
        })
      )
      .subscribe();
  }

  private getPageName(): void {
    if (this.#router.url.includes('create')) {
      this.pageName.set('create');
      this.userForm.enable();
    } else if (this.#router.url.includes('edit')) {
      this.pageName.set('edit');
      this.userForm.enable();
    } else {
      this.pageName.set('view');
      this.userForm.disable();
    }
  }
}
