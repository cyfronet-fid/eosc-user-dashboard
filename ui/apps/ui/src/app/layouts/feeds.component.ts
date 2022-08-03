import { Component, Input } from '@angular/core';
import { IFeed } from '../repositories/feed.interface';

@Component({
  selector: 'ui-feeds',
  template: `
    <div id="container">
      <ui-feed *ngFor="let feed of feeds" [feed]="feed"></ui-feed>
    </div>
  `,
  styles: [
    `
      #container {
        overflow-y: auto;
        max-height: calc(100% - 96px);
        width: calc(100% - 24px);
        margin: 12px;
      }
    `,
  ],
})
export class FeedsComponent {
  @Input()
  feeds: IFeed[] = [];
}
