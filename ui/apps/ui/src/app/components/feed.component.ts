import { Component, Input } from '@angular/core';
import { IFeed } from '../repositories/feed.interface';

@Component({
  selector: 'ui-feed',
  template: `
    <div class="container">
      <p>
        <small class="date">{{ feed.post_date }}</small>
      </p>
      <p class="title">
        <a href="{{ feed.Path }}" target="_blank">
          {{ feed.title }}
        </a>
      </p>
      <img [src]="feed.image.split(' ')[1]" style="width: 20%; height: 20%" />
      <article>
        <p class="description" [innerHTML]="feed.body"></p>
      </article>
    </div>
  `,
  styles: [
    `
      .container {
        margin-bottom: 12px;
        padding: 9px 12px 12px;
        border-radius: 5px;
        background: #f8f9fa;
        border-radius: 5px;
      }

      .container p {
        margin: 0 0 4px;
      }
      .date {
        color: rgba(0, 0, 0, 0.6);
        font-size: 12px;
      }
      .title {
        font-size: 15px;
        margin: 0 0 3px;
        line-height: 1.2;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
      }

      .description {
        font-size: 13px;
        line-height: 1.35;
      }

      article {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 9;
        line-clamp: 9;
        -webkit-box-orient: vertical;
      }
    `,
  ],
})
export class FeedComponent {
  @Input()
  feed!: IFeed;
}
