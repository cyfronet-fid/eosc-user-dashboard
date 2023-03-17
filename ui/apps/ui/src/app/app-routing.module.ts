import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    loadChildren: () =>
      import('./pages/landing-page/landing-page.module').then(
        (m) => m.LandingPageModule
      ),
    canActivate: [IsAnonymousUserGuardService],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard-page/dashboard-page.module').then(
        (m) => m.DashboardPageModule
      ),
    canActivate: [IsLoggedInUserGuardService],
  },
  {
    path: 'privacy-policy',
    loadChildren: () =>
      import('./pages/privacy-policy/privacy-policy.module').then(
        (m) => m.PrivacyPolicyModule
      ),
  },
  {
    path: 'acceptable-use-policy',
    loadChildren: () =>
      import('./pages/acceptable-use-policy/acceptable-use-policy.module').then(
        (m) => m.AcceptableUsePolicyModule
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    loadChildren: () =>
      import('./pages/error-page/error-page.module').then(
        (m) => m.ErrorPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
