import { Component, OnInit } from '@angular/core';
import { RecommendationsService } from '@components/recommendations-widget/recommendations.service';
import {
  IRecommendation,
  IRecommendationType,
} from '@components/recommendations-widget/types';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ActivatedRoute } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'ui-recommendations-widget',
  template: ` <div class="recommendations-widget">
    <h3>Recommended for you</h3>
    <ui-navbar
      [activeValue]="activeType"
      (newType)="changeType($event)"
    ></ui-navbar>
    <ngx-skeleton-loader
      *ngIf="this.recommendations.length === 0"
      count="5"
      appearance="line"
      animation="pulse"
      [theme]="{
        height: '180px',
        'border-radius': '17px'
      }"
    ></ngx-skeleton-loader>
    <ui-recommendation
      *ngFor="let recommendation of recommendations"
      [title]="recommendation.title"
      [url]="recommendation.url"
      [type]="recommendation.type.value"
      [id]="recommendation.id"
      [visitid]="recommendation.visitId"
      [description]="recommendation.description"
      [tags]="recommendation.tags"
      [accessTags]="recommendation.accessTag"
      [secondaryTags]="recommendation.secondaryTags"
      [tertiaryTags]="recommendation.tertiaryTags ?? []"
    ></ui-recommendation>
  </div>`,
})
export class RecommendationsWidgetComponent implements OnInit {
  recommendations: IRecommendation[] = [];
  activeType: IRecommendationType = 'all';

  constructor(
    private _recommendationsService: RecommendationsService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activeType =
      this._route.snapshot.queryParams['recommendationType'] || 'all';
    this._recommendationsService
      .fetch$(this.activeType)
      .pipe(untilDestroyed(this))
      .subscribe((recommendations) => (this.recommendations = recommendations));
  }

  changeType(newType: IRecommendationType) {
    this.activeType = newType;
    this._recommendationsService
      .fetch$(newType)
      .pipe(untilDestroyed(this))
      .subscribe((recommendations) => (this.recommendations = recommendations));
  }
}
