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
import { VideoWidgetService } from './widgets/videos/videos-widget.service';
import { DashboardPageModule } from '@pages/dashboard-page/dashboard-page.module';
import { ConfigService } from './services/config.service';
import { WINDOW } from './app.providers';

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

export const getConfigFactory$ = (configBootstrapService: ConfigService) => {
  return () => configBootstrapService.load$();
};

export const getVideosFactory$ = (videosService: VideoWidgetService) => {
  return () => videosService.get$();
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
    DashboardPageModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: WINDOW, useValue: window },
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
    {
      provide: APP_INITIALIZER,
      useFactory: getConfigFactory$,
      multi: true,
      deps: [ConfigService],
    },
    /*{
      provide: APP_INITIALIZER,
      useFactory: getVideosFactory$,
      multi: true,
      deps: [VideoWidgetService],
    },*/
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
