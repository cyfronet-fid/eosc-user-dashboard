import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryWidgetComponent } from './library-widget.component';
import { LibraryWidgetsSectionComponent } from './library-widgets-section.component';
import { FeedComponent } from './feed.component';
import { FavouriteComponent } from './favourite.component';
import { ResourceComponent } from './resource.component';

@NgModule({
  declarations: [
    LibraryWidgetComponent,
    LibraryWidgetsSectionComponent,
    LibraryWidgetsSectionComponent,
    FeedComponent,
    FavouriteComponent,
    ResourceComponent,
  ],
  imports: [CommonModule],
  exports: [
    LibraryWidgetComponent,
    LibraryWidgetsSectionComponent,
    LibraryWidgetsSectionComponent,
    FeedComponent,
    FavouriteComponent,
    ResourceComponent,
  ],
})
export class ComponentsModule {}
