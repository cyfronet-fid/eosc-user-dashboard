import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetUserProfileComponent } from './user-profile.component';

@NgModule({
  declarations: [WidgetUserProfileComponent],
  imports: [CommonModule],
  exports: [WidgetUserProfileComponent],
})
export class WidgetUserProfileModule {}
