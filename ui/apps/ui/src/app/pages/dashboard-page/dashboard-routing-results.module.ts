import { NgModule } from '@angular/core';
import { DashboardResultsComponent } from './dashboard-results.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardResultsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardResultsRoutingModule {}
