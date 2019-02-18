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
    MatSelectModule, MatSidenavModule, MatSliderModule, MatStepperModule,
    MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {APP_ROUTES} from './app.routes';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {TaskDialogComponent} from './task-dialog/task-dialog.component';
import {TasksService} from './services/tasks.service';
import {FormHouseComponent} from './houses/form/form.house.component';
import {HouseComponent} from './houses/house/house.component';
import {DataService} from './services/budget.service';
import {TaskComponent} from './task/task.component';
import {SkillsComponent} from './skills/skills.component';
import { MainNavBarComponent } from './shared/main-nav-bar/main-nav-bar.component';
import {FileSelectDirective, FileUploadModule} from 'ng2-file-upload';
import {ValidateAccountComponent} from './validate-account/validate-account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LangSelectorComponent } from './shared/lang-selector/lang-selector.component';
import { SideMenuComponent } from './shared/side-menu/side-menu.component';
import { MainSideMenuComponent } from './main-side-menu/main-side-menu.component';
import {LegalBarComponent} from './shared/legal-bar/legal-bar.component';
import {CheckBrowserComponent} from './checkBrowser/checkBrowser.component';
import { AppLayoutComponent } from './_layout/app-layout/app-layout.component';
import { PrestataireComponent } from './prestataire/prestataire.component';
import { ShortcutAreaComponent } from './shared/shortcut-area/shortcut-area.component';
import {CookieService} from 'ngx-cookie-service';
import { ShortcutComponent } from './shortcut/shortcut.component';
import { ShortcutDialogComponent } from './shortcut-dialog/shortcut-dialog.component';
import {UpdateComponent} from './update/update.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { BeforeLoginDialogComponent } from './before-login-dialog/before-login-dialog.component';


@NgModule({
    declarations: [
        AppComponent,
        HouseComponent,
        FormHouseComponent,
        LoginComponent,
        SignUpComponent,
        TaskComponent,
        TaskDialogComponent,
        SkillsComponent, // --- Dupliquer
        MainNavBarComponent,
        ValidateAccountComponent,
        DashboardComponent,
        LangSelectorComponent,
        LegalBarComponent,
        LangSelectorComponent,
        SideMenuComponent,
        MainSideMenuComponent,
        CheckBrowserComponent,
        AppLayoutComponent,
        PrestataireComponent,
        ShortcutAreaComponent,
        UpdateComponent,
        ShortcutDialogComponent,
        ShortcutComponent,
        BeforeLoginDialogComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatSelectModule,
        MatExpansionModule,
        ReactiveFormsModule, // --- Dupliquer
        MatCheckboxModule,
        MatRadioModule,
        MatDialogModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule, // --- Dupliquer
        BrowserAnimationsModule,
        MatSidenavModule, // --- Dupliquer
        MaterialModule,
        FormsModule,
        MatSliderModule,
        FileUploadModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatStepperModule,
        APP_ROUTES
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true},
        DataService, TasksService, CookieService
    ],
    entryComponents: [
        TaskDialogComponent, ShortcutDialogComponent, BeforeLoginDialogComponent
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
