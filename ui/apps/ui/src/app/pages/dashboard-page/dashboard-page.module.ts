import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard-page.component';
import { FormsModule } from '@angular/forms';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ComponentsModule } from '../../legacy-components/components.module';
import { DashboardRoutingModule } from './dashboard-routing-page.module';
import { WidgetUserProfileModule } from '@components/widgets/user-profile.module';
import { WidgetEoscNumbersModule } from '@components/widgets/eosc-numbers.module';
import { WidgetVideosModule } from '@components/widgets/videos.module';
import { WidgetUpcomingEventsModule } from '@components/widgets/upcoming-events.module';
import { WidgetImpactModule } from '@components/widgets/impact.module';
import { WidgetSocialMediaModule } from '@components/widgets/social-media.module';

@NgModule({
  imports: [
    FormsModule,
    NzDrawerModule,
    NzButtonModule,
    ComponentsModule,
    CommonModule,
    WidgetEoscNumbersModule,
    WidgetVideosModule,
    WidgetUpcomingEventsModule,
    WidgetImpactModule,
    WidgetSocialMediaModule,
    WidgetUserProfileModule,
    DashboardRoutingModule,
  ],
  declarations: [DashboardPageComponent],
})
export class DashboardPageModule {}
