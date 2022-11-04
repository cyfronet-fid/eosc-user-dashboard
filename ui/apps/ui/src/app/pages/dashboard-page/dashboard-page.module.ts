import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard-page.component';
import { FormsModule } from '@angular/forms';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ComponentsModule } from '../../legacy-components/components.module';
import { WidgetsModule } from '@components/widgets/widgets.module';

@NgModule({
  declarations: [DashboardPageComponent],
  imports: [
    FormsModule,
    NzDrawerModule,
    NzButtonModule,
    ComponentsModule,
    CommonModule,
    WidgetsModule,
  ],
})
export class DashboardPageModule {}
