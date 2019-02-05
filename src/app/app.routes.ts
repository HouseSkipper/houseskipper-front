import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {AuthGuardService} from './guards/auth-guard.service';
import {TaskComponent} from './task/task.component';
import {FormHouseComponent} from './houses/form/form.house.component';
import {HouseComponent} from './houses/house/house.component';
import { SkillsComponent} from './skills/skills.component';
import {ValidateAccountComponent} from './validate-account/validate-account.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AppLayoutComponent} from './_layout/app-layout/app-layout.component';

const ROUTES: Routes = [
    // App routes goes here
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            {path: '', component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuardService]},
            {path: 'validateAccount/:emailToken', component: ValidateAccountComponent},
            {path: 'users/houses/addhouse', component: FormHouseComponent, canActivate: [AuthGuardService]},
            {path: 'users/houses/:id', component: FormHouseComponent, canActivate: [AuthGuardService]},
            {path: 'users/houses', component: HouseComponent, canActivate: [AuthGuardService]},
            {path: 'users/tasks', component: TaskComponent, canActivate: [AuthGuardService]},
            {path: 'skills', component: SkillsComponent, canActivate: [AuthGuardService]},
            {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]}
        ]
    },

    // no layout routes
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignUpComponent },
    {path: '**', redirectTo: ''}
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES, {useHash: true});
