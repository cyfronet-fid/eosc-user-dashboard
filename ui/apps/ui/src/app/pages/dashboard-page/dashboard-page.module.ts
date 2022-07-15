import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard-page.component';
import { GridsterModule } from 'angular-gridster2';
import { FormsModule } from '@angular/forms';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [DashboardPageComponent],
  imports: [
    CommonModule,
    GridsterModule,
    FormsModule,
    NzDrawerModule,
    NzButtonModule,
  ],
})
export class DashboardPageModule {}
