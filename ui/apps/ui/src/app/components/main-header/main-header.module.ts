import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './main-header.component';
import { EoscHeaderModule } from '@components/eosc-header/eosc-header.module';
import { EoscCommunityWidgetModule } from '@components/widgets/eosc-community/eosc-community.module';

@NgModule({
  declarations: [MainHeaderComponent],
  imports: [CommonModule, EoscHeaderModule, EoscCommunityWidgetModule],
  exports: [MainHeaderComponent],
})
export class MainHeaderModule {}
