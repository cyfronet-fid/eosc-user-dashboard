import { Component, OnInit } from '@angular/core';
import { RecommendationsService } from '@components/recommendations-widget/recommendations.service';
import {
  IRecommendation,
  IRecommendationType,
} from '@components/recommendations-widget/types';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ActivatedRoute } from '@angular/router';
import { UserProfileService } from '../../auth/user-profile.service';
import { delay } from 'rxjs';

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
      [image]="recommendation.image"
      [pubdate]="recommendation.publicationDate"
      [type]="recommendation.type.value"
      [id]="recommendation.id"
      [visitid]="recommendation.visitId"
      [description]="recommendation.description"
      [tags]="recommendation.tags"
      [favs]="storedfavs"
      [jwttoken]="jwttoken"
      [accessTags]="recommendation.accessTag"
      [secondaryTags]="recommendation.secondaryTags"
      [tertiaryTags]="recommendation.tertiaryTags ?? []"
    ></ui-recommendation>
  </div>`,
})
export class RecommendationsWidgetComponent implements OnInit {
  recommendations: IRecommendation[] = [];
  activeType: IRecommendationType = 'all';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  storedfavs: any;
  jwttoken!: string;

  constructor(
    private _recommendationsService: RecommendationsService,
    private _route: ActivatedRoute,
    private _userProfileService: UserProfileService
  ) {}

  ngOnInit() {
    this._userProfileService.user$
      .pipe(
        untilDestroyed(this),
        // delay is required to have rerender out of angular's detection cycle
        delay(0)
      )
      .subscribe((profile) => {
        this.jwttoken = profile.jwttoken;
        this.getFavs();
        this.activeType =
          this._route.snapshot.queryParams['recommendationType'] || 'all';
        this._recommendationsService
          .fetch$(this.activeType)
          .pipe(untilDestroyed(this))
          .subscribe(
            (recommendations) => (this.recommendations = recommendations)
          );
      });
  }

  getFavs() {
    this._recommendationsService
      .favget$(this.jwttoken)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .subscribe((storedfavs) => (this.storedfavs = storedfavs));
  }

  changeType(newType: IRecommendationType) {
    this.activeType = newType;
    this.getFavs();
    this._recommendationsService
      .fetch$(newType)
      .pipe(untilDestroyed(this))
      .subscribe((recommendations) => {
        this.recommendations = recommendations;
      });
  }
}
