import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { MainHeaderComponent } from './main-header.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { LandingPageModule } from './landing-page/landing-page.module';
import { DashboardPageModule } from './dashboard-page/dashboard-page.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ErrorPageComponent,
    MainHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbRatingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    LandingPageModule,
    DashboardPageModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
