import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserProfileService } from './auth/user-profile.service';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { AuthInterceptor } from './auth/auth.interceptor';
import { MainHeaderModule } from '@components/main-header/main-header.module';
import { EoscHeaderModule } from '@components/eosc-header/eosc-header.module';
import { EOSCNumbersWidgetService } from './widgets/eosc-numbers/eosc-numbers-widget.service';
import { UpcomingEventsWidgetService } from './widgets/upcoming-events/upcoming-events-widget.service';

registerLocaleData(en);

export const getUserProfileFactory$ = (
  userProfileService: UserProfileService
) => {
  return () => userProfileService.get$();
};

export const getEOSCNumbersFactory$ = (
  eoscNumbersService: EOSCNumbersWidgetService
) => {
  return () => eoscNumbersService.get$();
};

export const getUpcomingEventsFactory$ = (
  upcomingEventsService: UpcomingEventsWidgetService
) => {
  return () => upcomingEventsService.get$();

};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    MainHeaderModule,
    EoscHeaderModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: getUserProfileFactory$,
      multi: true,
      deps: [UserProfileService],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: getEOSCNumbersFactory$,
      multi: true,
      deps: [EOSCNumbersWidgetService],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: getUpcomingEventsFactory$,
      multi: true,
      deps: [UpcomingEventsWidgetService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
