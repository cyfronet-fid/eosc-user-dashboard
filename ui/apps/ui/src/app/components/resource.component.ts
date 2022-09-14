import { Component, Input } from '@angular/core';
import { IResource } from '../repositories/resource.interface';

@Component({
  selector: 'ui-resource',
  template: `
    <div id="container" *ngIf="resource !== undefined">
      <p>
        <a class="title" href="{{ resource.url }}" target="_blank">{{
          resource.title
        }}</a>
      </p>
      <article>
        <p>
          <small>
            <i>
              {{ resource.description }}
            </i>
          </small>
        </p>
      </article>
      <ng-container *ngIf="resource.organisation !== undefined">
        <p>Organisation: {{ resource.organisation }}</p>
      </ng-container>
      <ng-container *ngIf="resource.authors !== undefined">
        <p>Authors: {{ resource.authors }}</p>
      </ng-container>
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
export class ResourceComponent {
  @Input()
  resource!: IResource;
}
