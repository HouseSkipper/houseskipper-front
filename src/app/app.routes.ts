import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {AuthGuardService} from './guards/auth-guard.service';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FormHouseComponent} from './houses/form/form.house.component';
import {HouseComponent} from './houses/house/house.component';
import { SkillsComponent} from './skills/skills.component';

const ROUTES: Routes = [
    {path: '', component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuardService]},
    {path: 'signup', component: SignUpComponent},
    {path: 'login', component: LoginComponent},
    {path: 'users/houses/addhouse', component: FormHouseComponent, canActivate: [AuthGuardService]},
    {path: 'users/houses', component: HouseComponent, canActivate: [AuthGuardService]},
    { path: 'users/dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
    { path: 'skills', component: SkillsComponent, canActivate: [AuthGuardService]},
    {path: '**', redirectTo: ''}
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES, {useHash: true});
