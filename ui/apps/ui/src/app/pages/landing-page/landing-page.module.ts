import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import { EoscHeaderModule } from '@components/eosc-header/eosc-header.module';
import { EoscCommunityWidgetModule } from '@components/widgets/eosc-community/eosc-community.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    EoscHeaderModule,
    EoscCommunityWidgetModule,
    RouterModule.forChild([
      {
        path: '',
        component: LandingPageComponent,
      },
    ]),
  ],
})
export class LandingPageModule {}
