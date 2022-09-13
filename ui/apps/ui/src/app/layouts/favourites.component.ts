import { Component, Input } from '@angular/core';
import { IResource } from '../repositories/resource.interface';

@Component({
  selector: 'ui-favourites',
  template: `
    <div class="container">
      <ui-favourite
        *ngFor="let favourite of favourites"
        class="widget-item"
        [favourite]="favourite"
      ></ui-favourite>
    </div>
  `,
  styles: [
    `
      .container {
        overflow-y: auto;
        max-height: calc(100% - 96px);
        width: calc(100% - 24px);
        margin: 0;
        padding: 0;
      }
    `,
  ],
})
export class FavouritesComponent {
  @Input()
  favourites: IResource[] = [];
}
