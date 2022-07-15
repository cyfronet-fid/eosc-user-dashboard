import { NgModule } from '@angular/core';
import { DashboardPageModule } from './dashboard-page/dashboard-page.module';
import { LandingPageModule } from './landing-page/landing-page.module';
import { ErrorPageModule } from './error-page/error-page.module';

@NgModule({
  declarations: [],
  imports: [DashboardPageModule, LandingPageModule, ErrorPageModule],
})
export class PagesModule {}
