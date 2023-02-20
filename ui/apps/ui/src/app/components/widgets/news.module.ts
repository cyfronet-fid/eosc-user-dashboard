import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetNewsComponent } from './news.component';

@NgModule({
  declarations: [WidgetNewsComponent],
  imports: [CommonModule],
  exports: [WidgetNewsComponent],
})
export class WidgetNewsModule {}
