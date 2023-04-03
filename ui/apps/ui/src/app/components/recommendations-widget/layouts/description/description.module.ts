import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescriptionComponent, SafeHtmlPipe } from './description.component';

@NgModule({
  declarations: [DescriptionComponent, SafeHtmlPipe],
  imports: [CommonModule],
  exports: [DescriptionComponent],
})
export class DescriptionModule {}
