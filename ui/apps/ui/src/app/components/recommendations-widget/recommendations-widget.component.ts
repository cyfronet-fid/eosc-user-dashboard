import { Component } from '@angular/core';
import { RecommendationsService } from '@components/recommendations-widget/recommendations.service';

@Component({
  selector: 'ui-recommendations-widget',
  template: `<ui-recommendation
    *ngFor="let recommendation of recommendations$ | async"
    [title]="recommendation.title"
    [url]="recommendation.url"
    [description]="recommendation.description"
    [tags]="recommendation.tags"
    [secondaryTags]="recommendation.secondaryTags"
    [tertiaryTags]="recommendation.tertiaryTags ?? []"
  ></ui-recommendation>`,
  styles: [],
})
export class RecommendationsWidgetComponent {
  recommendations$ = this._recommendationsService.fetch$('all');

  constructor(private _recommendationsService: RecommendationsService) {}
}
