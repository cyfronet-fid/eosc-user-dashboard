import { Component, Input } from '@angular/core';
import { IFeed } from '../repositories/feed.interface';

@Component({
  selector: 'ui-feeds',
  template: `
    <div class="container">
      <ui-feed
        *ngFor="let feed of feeds.slice(0, 9)"
        [feed]="feed"
        class="widget-column-container"
      ></ui-feed>
    </div>
  `,
  styles: [
    `
      .container {
        overflow-y: auto;
        max-height: calc(100% - 96px);
        margin: 0;
        padding: 0;
      }
    `,
  ],
})
export class FeedsComponent {
  @Input()
  feeds: IFeed[] = [];
}
