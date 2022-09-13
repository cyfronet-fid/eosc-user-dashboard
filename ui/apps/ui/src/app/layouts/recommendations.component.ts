import { Component, Input } from '@angular/core';
import { IResource } from '../repositories/resource.interface';

@Component({
  selector: 'ui-recommendations',
  template: `
    <div class="widget-container">
      <ui-resource
        class="widget-column-carousel"
        *ngFor="let resource of resources"
        [resource]="resource"
      ></ui-resource>
    </div>
  `,
  styles: [
    `
      .widget-container {
        display: flex;
        padding: 0;
        margin: 0;
      }
    `,
  ],
})
export class RecommendationsComponent {
  @Input()
  resources: IResource[] = [];
}
