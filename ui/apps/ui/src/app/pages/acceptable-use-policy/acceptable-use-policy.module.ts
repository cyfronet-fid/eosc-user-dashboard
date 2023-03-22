import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AcceptableUsePolicyComponent } from '@pages/acceptable-use-policy/acceptable-use-policy.component';
import { BackToDashboardBarModule } from '@components/back-to-dashboard-bar/back-to-dashboard-bar.module';

@NgModule({
  declarations: [AcceptableUsePolicyComponent],
  imports: [
    CommonModule,
    BackToDashboardBarModule,
    RouterModule.forChild([
      {
        path: '',
        component: AcceptableUsePolicyComponent,
      },
    ]),
  ],
})
export class AcceptableUsePolicyModule {}
