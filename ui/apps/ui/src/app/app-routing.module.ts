import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
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
    path: 'projects', // Fake navigation to test routes
    component: LandingPageComponent,
    canActivate: [LoggedInUser], // Activate when loggedIn
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
