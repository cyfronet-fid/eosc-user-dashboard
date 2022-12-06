import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescriptionComponent } from './description.component';

@NgModule({
  declarations: [DescriptionComponent],
  imports: [CommonModule],
  exports: [DescriptionComponent],
})
export class DescriptionModule {}
