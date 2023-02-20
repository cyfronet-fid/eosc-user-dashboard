import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetUserProfileComponent } from './user-profile.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [WidgetUserProfileComponent],
  imports: [CommonModule, RouterModule],
  exports: [WidgetUserProfileComponent],
})
export class WidgetUserProfileModule {}
