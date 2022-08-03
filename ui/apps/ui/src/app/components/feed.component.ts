import { Component, Input } from '@angular/core';
import { IFeed } from '../repositories/feed.interface';

@Component({
  selector: 'ui-feed',
  template: `
    <div id="container">
      <p>
        <small class="date">{{ feed.post_date }}</small>
      </p>
      <p>
        <a class="title" href="#">{{ feed.title }}</a>
      </p>
      <article>
        <p>
          <small>
            <i>
              {{ feed.body }}
            </i>
          </small>
        </p>
      </article>
    </div>
  `,
  styles: [
    `
      .date {
        color: rgba(0, 0, 0, 0.6);
      }
      .title {
      }
      #container {
        margin-bottom: 12px;
        padding: 20px;
        border-radius: 5px;
        background: white;
      }
      article {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    `,
  ],
})
export class FeedComponent {
  @Input()
  feed!: IFeed;
}
