import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EoscCommunityWidgetComponent } from './eosc-community.component';
import { EoscCommunityLifeWidgetModule } from './eosc-life.module';
import { EoscCommunitySSHOCWidgetModule } from './eosc-sshoc.module';
import { EoscCommunityEscapeWidgetModule } from './eosc-escape.module';
import { EoscCommunityEnvriWidgetModule } from './eosc-envri.module';
import { EoscCommunityPanoscWidgetModule } from './eosc-panosc.module';

@NgModule({
  declarations: [EoscCommunityWidgetComponent],
  imports: [
    CommonModule,
    EoscCommunityLifeWidgetModule,
    EoscCommunitySSHOCWidgetModule,
    EoscCommunityEscapeWidgetModule,
    EoscCommunityEnvriWidgetModule,
    EoscCommunityPanoscWidgetModule,
  ],
  exports: [EoscCommunityWidgetComponent],
})
export class EoscCommunityWidgetModule {}
