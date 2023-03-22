import { NgModule } from '@angular/core';
import { DashboardPageModule } from './dashboard-page/dashboard-page.module';
import { LandingPageModule } from './landing-page/landing-page.module';
import { ErrorPageModule } from './error-page/error-page.module';
import { PrivacyPolicyModule } from '@pages/privacy-policy/privacy-policy.module';
import { AcceptableUsePolicyModule } from '@pages/acceptable-use-policy/acceptable-use-policy.module';

@NgModule({
  declarations: [],
  exports: [],
  imports: [
    DashboardPageModule,
    LandingPageModule,
    ErrorPageModule,
    PrivacyPolicyModule,
    AcceptableUsePolicyModule,
  ],
})
export class PagesModule {}
