import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EoscCommunityWidgetComponent } from './eosc-community.component';
import { EoscCommunityLifeWidgetModule } from './eosc-life.module';

@NgModule({
  declarations: [EoscCommunityWidgetComponent],
  imports: [CommonModule, EoscCommunityLifeWidgetModule],
  exports: [EoscCommunityWidgetComponent],
})
export class EoscCommunityWidgetModule {}
