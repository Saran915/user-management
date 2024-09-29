import { Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserFormComponent } from './user-form/user-form.component';

export const user_routes: Routes = [
  { path: '', component: UserComponent },
  { path: 'create', component: UserFormComponent },
  { path: 'edit/:userId', component: UserFormComponent },
  { path: 'details/:userId', component: UserFormComponent },
];
