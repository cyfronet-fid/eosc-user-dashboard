import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './main-header.component';
import { LibraryComponent } from './library.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { ComponentsModule } from '../components/components.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { GridComponent } from './grid.component';
import { GridRightComponent } from './grid-right.component';
import { GridsterModule } from 'angular-gridster2';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { WidgetContentComponent } from './widget-content.component';
import { FeedsComponent } from './feeds.component';
import { FavouritesComponent } from './favourites.component';
import { RecommendationsComponent } from './recommendations.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MainHeaderComponent,
    LibraryComponent,
    GridComponent,
    WidgetContentComponent,
    FeedsComponent,
    FavouritesComponent,
    RecommendationsComponent,
    GridRightComponent,
  ],
  imports: [
    CommonModule,
    NzDrawerModule,
    ComponentsModule,
    NzButtonModule,
    GridsterModule,
    NzDropDownModule,
    RouterModule
  ],
  exports: [MainHeaderComponent, LibraryComponent, GridComponent, GridRightComponent],
})
export class LayoutsModule {}
