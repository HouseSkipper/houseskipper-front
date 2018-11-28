import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptorService} from './interceptors/jwt-interceptor.service';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule, MatInputModule,
    MatRadioModule,
    MatToolbarModule
} from '@angular/material';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {APP_ROUTES} from './app.routes';
import { HouseComponent } from './house/house.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HouseComponent
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      MatIconModule,
      MatToolbarModule,
      MatButtonModule,
      MatExpansionModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
      MatCheckboxModule,
      MatRadioModule,
      MatDialogModule,
      MatInputModule,
      APP_ROUTES
  ],
  providers: [
      {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
