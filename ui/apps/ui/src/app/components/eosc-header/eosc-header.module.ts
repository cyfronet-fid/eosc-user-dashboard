import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EoscHeaderComponent } from './eosc-header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [EoscHeaderComponent],
  imports: [CommonModule, RouterModule],
  exports: [EoscHeaderComponent],
})
export class EoscHeaderModule {}
