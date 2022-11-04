import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetUserProfileComponent } from './user-profile.component';
import { WidgetEoscNumbersComponent } from './eosc-numbers.component';
import { WidgetImpactComponent } from './impact.component';
import { WidgetSocialMediaComponent } from './social-media.component';
import { WidgetUpcomingEventsComponent } from './upcoming-events.component';
import { WidgetVideosComponent } from './videos-component';

@NgModule({
  declarations: [
    WidgetUserProfileComponent,
    WidgetEoscNumbersComponent,
    WidgetImpactComponent,
    WidgetSocialMediaComponent,
    WidgetUpcomingEventsComponent,
    WidgetVideosComponent,
  ],
  imports: [CommonModule],
  exports: [
    WidgetUserProfileComponent,
    WidgetEoscNumbersComponent,
    WidgetImpactComponent,
    WidgetSocialMediaComponent,
    WidgetUpcomingEventsComponent,
    WidgetVideosComponent,
  ],
})
export class WidgetsModule {}
