import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackToDashboardBarComponent } from '@components/back-to-dashboard-bar/back-to-dashboard-bar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BackToDashboardBarComponent],
  imports: [CommonModule, RouterModule],
  exports: [BackToDashboardBarComponent],
})
export class BackToDashboardBarModule {}
