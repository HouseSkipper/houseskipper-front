import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptorService} from './interceptors/jwt-interceptor.service';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatToolbarModule} from '@angular/material';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {APP_ROUTES} from './app.routes';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {DataService} from './services/task.service';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import {DataaService} from './services/dataa.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    DashboardComponent,
    TaskDialogComponent
  ],
  imports: [
      ReactiveFormsModule,
      BrowserModule,
      HttpClientModule,
      MatIconModule,
      MatToolbarModule,
      MatButtonModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      BrowserAnimationsModule,
      MaterialModule,
      FormsModule,
      APP_ROUTES
  ],
  providers: [
      {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true},
      DataService, DataaService
  ],
    entryComponents: [
        TaskDialogComponent
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
