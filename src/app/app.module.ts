import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptorService} from './interceptors/jwt-interceptor.service';
import {
    MatButtonModule,
    MatCardModule, MatCheckboxModule, MatDialogModule, MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatRadioModule,
    MatSelectModule, MatSidenavModule,
    MatToolbarModule
} from '@angular/material';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {APP_ROUTES} from './app.routes';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ProfileComponent } from './profile/profile.component';
import { HouseComponent } from './house/house.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    ProfileComponent,
    HouseComponent
  ],
  imports: [
      ReactiveFormsModule,
      BrowserModule,
      HttpClientModule,
      MatIconModule,
      MatToolbarModule,
      MatButtonModule,
      MatExpansionModule,
      ReactiveFormsModule,
      MatCheckboxModule,
      MatRadioModule,
      MatDialogModule,
      MatInputModule,
      MatSelectModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      BrowserAnimationsModule,
      MatSelectModule,
      MatSidenavModule,
      APP_ROUTES
  ],
  providers: [
      {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
