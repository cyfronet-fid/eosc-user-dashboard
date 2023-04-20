import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ComponentsModule } from '../../legacy-components/components.module';
import { DashboardFavsRoutingModule } from './dashboard-routing-favs.module';
import { DashboardFavsComponent } from '@pages/dashboard-page/dashboard-favs.component';
import { RecommendationsWidgetModule } from '@components/recommendations-widget/recommendations-widget.module';
import { EoscHeaderModule } from '@components/eosc-header/eosc-header.module';
import { WidgetCommunitiesModule } from '../../components/widgets/communities.module';
import { WidgetNewsModule } from '@components/widgets/news.module';
import { WidgetProjectModule } from '@components/widgets/project.module';
import { NgxRerenderModule } from 'ngx-rerender';

@NgModule({
  declarations: [DashboardFavsComponent],
  exports: [DashboardFavsComponent],
  imports: [
    FormsModule,
    NzDrawerModule,
    NzButtonModule,
    ComponentsModule,
    CommonModule,
    DashboardFavsRoutingModule,
    RecommendationsWidgetModule,
    EoscHeaderModule,
    WidgetCommunitiesModule,
    WidgetNewsModule,
    WidgetProjectModule,
    NgxRerenderModule,
  ],
})
export class DashboardFavsModule {}
