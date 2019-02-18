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
import {CheckBrowserComponent} from './checkBrowser/checkBrowser.component';
import {AppLayoutComponent} from './_layout/app-layout/app-layout.component';
import {PrestataireComponent} from './prestataire/prestataire.component';
import {UpdateComponent} from './update/update.component';
import {BeforeLoginDialogComponent} from './before-login-dialog/before-login-dialog.component';
import {FormTaskComponent} from './form-task/form-task.component';
import {SubSkillComponent} from './sub-skill/sub-skill.component';

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
            {path: 'users/tasks/addtask', component: FormTaskComponent, canActivate: [AuthGuardService]},
            {path: 'users/tasks/:id', component: FormTaskComponent, canActivate: [AuthGuardService]},
            {path: 'skills', component: SkillsComponent, canActivate: [AuthGuardService]},
            {path: 'skills/:id', component: SubSkillComponent, canActivate: [AuthGuardService]},
            {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
            {path: 'update', component: UpdateComponent, canActivate: [AuthGuardService]},
        ]
    },
    // no layout routes
    { path: 'home', component: BeforeLoginDialogComponent},
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignUpComponent },
    { path: 'prestataireSignup', component: PrestataireComponent},
    {path: 'validateAccountBrowser', component: CheckBrowserComponent},
    {path: '**', redirectTo: ''}
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES, {useHash: true});
