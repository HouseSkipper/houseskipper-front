import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {AuthGuardService} from './guards/auth-guard.service';
import {ProfileComponent} from './profile/profile.component';

const ROUTES: Routes = [
  { path: '', component: ProfileComponent, pathMatch: 'full', canActivate: [AuthGuardService] },
  { path: 'signup', component: SignUpComponent},
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: ''}
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES, { useHash: true });
