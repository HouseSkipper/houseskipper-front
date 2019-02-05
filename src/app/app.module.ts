import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptorService} from './interceptors/jwt-interceptor.service';
import {
    MatButtonModule,
    MatCardModule, MatCheckboxModule, MatDialogModule, MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatRadioModule,
    MatSelectModule, MatSidenavModule, MatSliderModule,
    MatToolbarModule
} from '@angular/material';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {APP_ROUTES} from './app.routes';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {TaskDialogComponent} from './task-dialog/task-dialog.component';
import {DataaService} from './services/dataa.service';
import {FormHouseComponent} from './houses/form/form.house.component';
import {HouseComponent} from './houses/house/house.component';
import {DataService} from './services/task.service';
import {TaskComponent} from './task/task.component';
import {SkillsComponent} from './skills/skills.component';
import { MainNavBarComponent } from './shared/main-nav-bar/main-nav-bar.component';
import {FileSelectDirective, FileUploadModule} from 'ng2-file-upload';
import {DirectiveType} from '@angular/core/src/render3';
import {ValidateAccountComponent} from './validate-account/validate-account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LangSelectorComponent } from './shared/lang-selector/lang-selector.component';
import { LegalBarComponent } from './shared/legal-bar/legal-bar.component';
import {CheckBrowserComponent} from './checkBrowser/checkBrowser.component';


@NgModule({
    declarations: [
        AppComponent,
        HouseComponent,
        FormHouseComponent,
        LoginComponent,
        SignUpComponent,
        TaskComponent,
        TaskDialogComponent,
        SkillsComponent,
        MainNavBarComponent,
        SkillsComponent,
        ValidateAccountComponent,
        DashboardComponent,
        LangSelectorComponent,
        LegalBarComponent,
        CheckBrowserComponent
    ],
    imports: [
        ReactiveFormsModule,
        BrowserModule,
        HttpClientModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatSelectModule,
        MatExpansionModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatRadioModule,
        MatDialogModule,
        MatInputModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MaterialModule,
        FormsModule,
        MatSliderModule,
        FileUploadModule,
        MatSidenavModule,
        APP_ROUTES
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true},
        DataService, DataaService
    ],
    entryComponents: [
        TaskDialogComponent
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
