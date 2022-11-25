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
import { EoscCommunityWidgetModule } from '@components/widgets/eosc-community/eosc-community.module';
import { EoscCommunityLifeWidgetModule } from '@components/widgets/eosc-community/eosc-life.module';
import { EoscCommunitySSHOCWidgetModule } from '@components/widgets/eosc-community/eosc-sshoc.module';
import { EoscCommunityEscapeWidgetModule } from '@components/widgets/eosc-community/eosc-escape.module';
import { EoscCommunityEnvriWidgetModule } from '@components/widgets/eosc-community/eosc-envri.module';
import { EoscCommunityPanoscWidgetModule } from '@components/widgets/eosc-community/eosc-panosc.module';

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
    EoscCommunityWidgetModule,
    EoscCommunityLifeWidgetModule,
    EoscCommunitySSHOCWidgetModule,
    EoscCommunityEscapeWidgetModule,
    EoscCommunityEnvriWidgetModule,
    EoscCommunityPanoscWidgetModule,
    DashboardRoutingModule,
  ],
  declarations: [DashboardPageComponent],
})
export class DashboardPageModule {}
