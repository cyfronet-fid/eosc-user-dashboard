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
import { WidgetsModule } from '@components/widgets/widgets.module';
import { PagesModule } from '@pages/pages.module';

registerLocaleData(en);

export const getUserProfileFactory$ = (
  userProfileService: UserProfileService
) => {
  return () => userProfileService.get$();
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    MainHeaderModule,
    WidgetsModule,
    PagesModule,
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
