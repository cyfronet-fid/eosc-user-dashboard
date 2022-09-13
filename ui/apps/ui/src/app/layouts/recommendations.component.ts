import { Component, Input } from '@angular/core';
import { IResource } from '../repositories/resource.interface';

@Component({
  selector: 'ui-recommendations',
  template: `
    <div class="container">
      <ui-resource
        *ngFor="let resource of resources"
        [resource]="resource"
      ></ui-resource>
    </div>
  `,
  styles: [
    `
      .container {
        overflow-y: auto;
        max-height: calc(100% - 96px);
        margin: 12px;
      }
    `,
  ],
})
export class RecommendationsComponent {
  @Input()
  resources: IResource[] = [];
}
