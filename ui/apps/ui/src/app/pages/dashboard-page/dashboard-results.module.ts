import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ComponentsModule } from '../../legacy-components/components.module';
import { DashboardResultsRoutingModule } from './dashboard-routing-results.module';
import { DashboardResultsComponent } from '@pages/dashboard-page/dashboard-results.component';
import { RecommendationsWidgetModule } from '@components/recommendations-widget/recommendations-widget.module';
import { EoscHeaderModule } from '@components/eosc-header/eosc-header.module';
import { WidgetCommunitiesModule } from '../../components/widgets/communities.module';
import { WidgetNewsModule } from '@components/widgets/news.module';
import { WidgetProjectModule } from '@components/widgets/project.module';

@NgModule({
  declarations: [DashboardResultsComponent],
  exports: [DashboardResultsComponent],
  imports: [
    FormsModule,
    NzDrawerModule,
    NzButtonModule,
    ComponentsModule,
    CommonModule,
    DashboardResultsRoutingModule,
    RecommendationsWidgetModule,
    EoscHeaderModule,
    WidgetCommunitiesModule,
    WidgetNewsModule,
    WidgetProjectModule,
  ],
})
export class DashboardResultsModule {}
