import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryWidgetComponent } from './library-widget.component';
import { LibraryWidgetsSectionComponent } from './library-widgets-section.component';
import { FeedComponent } from './feed.component';

@NgModule({
  declarations: [
    LibraryWidgetComponent,
    LibraryWidgetsSectionComponent,
    LibraryWidgetsSectionComponent,
    FeedComponent,
  ],
  imports: [CommonModule],
    exports: [
        LibraryWidgetComponent,
        LibraryWidgetsSectionComponent,
        LibraryWidgetsSectionComponent,
        FeedComponent,
    ],
})
export class ComponentsModule {}
