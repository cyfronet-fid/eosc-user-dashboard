import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryWidgetComponent } from './library-widget.component';
import {LibraryWidgetsSectionComponent} from "./library-widgets-section.component";

@NgModule({
  declarations: [LibraryWidgetComponent, LibraryWidgetsSectionComponent, LibraryWidgetsSectionComponent],
  imports: [CommonModule],
  exports: [LibraryWidgetComponent, LibraryWidgetsSectionComponent, LibraryWidgetsSectionComponent],
})
export class ComponentsModule {}
