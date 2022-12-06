import { Component } from '@angular/core';
import { RecommendationsService } from '@components/recommendations-widget/recommendations.service';

@Component({
  selector: 'ui-recommendations-widget',
  template: ` <div class="recommendations-widget">
    <ui-recommendation
      *ngFor="let recommendation of recommendations$ | async"
      [title]="recommendation.title"
      [url]="recommendation.url"
      [description]="recommendation.description"
      [tags]="recommendation.tags"
      [secondaryTags]="recommendation.secondaryTags"
      [tertiaryTags]="recommendation.tertiaryTags ?? []"
    ></ui-recommendation>
  </div>`,
  styles: [
    `
      .recommendations-widget {
        padding: 24px;
      }
    `,
  ],
})
export class RecommendationsWidgetComponent {
  recommendations$ = this._recommendationsService.fetch$('all');

  constructor(private _recommendationsService: RecommendationsService) {}
}
