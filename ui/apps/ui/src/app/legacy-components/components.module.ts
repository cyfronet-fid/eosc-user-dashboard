import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed.component';
import { FavouriteComponent } from './favourite.component';
import { ResourceComponent } from './resource.component';

@NgModule({
  declarations: [FeedComponent, FavouriteComponent, ResourceComponent],
  imports: [CommonModule],
  exports: [FeedComponent, FavouriteComponent, ResourceComponent],
})
export class ComponentsModule {}
