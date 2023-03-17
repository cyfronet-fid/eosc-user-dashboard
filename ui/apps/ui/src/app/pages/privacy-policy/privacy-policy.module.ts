import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PrivacyPolicyComponent } from '@pages/privacy-policy/privacy-policy.component';
import { BackToDashboardBarModule } from '@components/back-to-dashboard-bar/back-to-dashboard-bar.module';

@NgModule({
  declarations: [PrivacyPolicyComponent],
  imports: [
    CommonModule,
    BackToDashboardBarModule,
    RouterModule.forChild([
      {
        path: '',
        component: PrivacyPolicyComponent,
      },
    ]),
  ],
})
export class PrivacyPolicyModule {}
