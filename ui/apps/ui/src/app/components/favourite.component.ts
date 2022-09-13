import { Component, Input } from '@angular/core';
import { IResource } from '../repositories/resource.interface';

@Component({
  selector: 'ui-favourite',
  template: `
    <div id="container" *ngIf="favourite !== undefined">
      <p class="title">
        <a href="{{ favourite.url }}" target="_blank">{{ favourite.title }}</a>
      </p>
      <ng-container *ngIf="favourite.organisation !== undefined">
        <p class="additional">Organisation: {{ favourite.organisation }}</p>
      </ng-container>
      <article>
        <p class="description">{{ favourite.description }}</p>
      </article>
    </div>
  `,
  styles: [
    `
      .title {
      }
      #container {
        margin-bottom: 12px;
        padding: 12px;
        border-radius: 5px;
        background: #f8f9fa;
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
export class FavouriteComponent {
  @Input()
  favourite!: IResource;
}
