import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EoscHeaderComponent } from './eosc-header.component';
import { RouterModule } from '@angular/router';
import { SearchbarWithLogoComponent } from './searchbar-with-logo.component';

@NgModule({
  declarations: [EoscHeaderComponent, SearchbarWithLogoComponent],
  imports: [CommonModule, RouterModule],
    exports: [EoscHeaderComponent, SearchbarWithLogoComponent],
})
export class EoscHeaderModule {}
