import { NgModule } from '@angular/core';
import { DashboardFavsComponent } from './dashboard-favs.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardFavsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardFavsRoutingModule {}
