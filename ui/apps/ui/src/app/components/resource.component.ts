import { Component, Input } from '@angular/core';
import { IResource } from '../repositories/resource.interface';

@Component({
  selector: 'ui-resource',
  template: `
    <div class="container" *ngIf="resource !== undefined">
      <p class="title">
        <a href="{{ resource.url }}" target="_blank">{{ resource.title }}</a>
      </p>
      <ng-container *ngIf="resource.organisation !== undefined">
        <p class="additional">Organisation: {{ resource.organisation }}</p>
      </ng-container>
      <ng-container *ngIf="resource.authors !== undefined">
        <p class="additional">Authors: {{ resource.authors }}</p>
      </ng-container>
      <article>
        <p class="description" [innerHTML]="resource.description"></p>
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
      .container {
        margin-bottom: 12px;
        padding: 12px;
        border-radius: 5px;
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
