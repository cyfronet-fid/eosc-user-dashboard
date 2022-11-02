import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from '@pages/error-page/error-page.component';
import { LandingPageComponent } from '@pages/landing-page/landing-page.component';
import { DashboardPageComponent } from '@pages/dashboard-page/dashboard-page.component';
import { IsAnonymousUserGuardService } from './auth/is-anonymous-user.guard.service';
import { IsLoggedInUserGuardService } from './auth/is-logged-in-user.guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main',
  },
  {
    path: 'main',
    component: LandingPageComponent,
    canActivate: [IsAnonymousUserGuardService],
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    canActivate: [IsLoggedInUserGuardService],
  },
  { path: '**', pathMatch: 'full', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
