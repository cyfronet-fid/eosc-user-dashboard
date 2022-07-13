import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { AnonymousUser } from './auth/anonymous-user.service';
import { LoggedInUser } from './auth/logged-in-user.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main',
  },
  {
    path: 'main',
    component: LandingPageComponent,
    canActivate: [AnonymousUser],
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    canActivate: [LoggedInUser],
  },
  { path: '**', pathMatch: 'full', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
