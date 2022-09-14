import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard-page.component';
import { GridsterModule } from 'angular-gridster2';
import { FormsModule } from '@angular/forms';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ComponentsModule } from '../../components/components.module';
import { LayoutsModule } from '../../layouts/layouts.module';

@NgModule({
  declarations: [DashboardPageComponent],
  imports: [
    GridsterModule,
    FormsModule,
    NzDrawerModule,
    NzButtonModule,
    ComponentsModule,
    LayoutsModule,
    CommonModule,
  ],
})
export class DashboardPageModule {}
