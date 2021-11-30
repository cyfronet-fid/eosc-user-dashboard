import {Component, Inject, OnInit} from '@angular/core';
import {IUserActivityResponse} from "./user-activity/user-activity.model";
import {Observable} from "rxjs";
import {UserActivityService} from "./user-activity/user-activity.service";
import {ILatestInfo} from "./latest-info/latest-info.model";
import {LatestInfoService} from "./latest-info/latest-info.service";
import {DOCUMENT} from "@angular/common";
import {RecommendedResourceService} from "./reommended-resources/recommended-resource.service";
import {IRecommendedResource} from "./reommended-resources/recommended-resource.model";
import {RecommendedPublicationsService} from "./recommended-publications/recommended-publications.service";
import {IRecommendedPublication} from "./recommended-publications/recommended-publication.model";
import {PopularArticlesService} from "./popular-articles/popular-articles.service";
import {IPopularArticle} from "./popular-articles/popular-articles.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userActivities$: Observable<IUserActivityResponse[]> = this._userActivityService.get();
  latestInformations$: Observable<ILatestInfo[]> = this._latestInfoService.get();
  recommendedResources$: Observable<IRecommendedResource[]> = this._recommendedResourcesService.get();
  recommendedPublications$: Observable<IRecommendedPublication[]> = this._recommendedPublicationsService.get();
  popularArticles$:Observable<IPopularArticle[]> = this._popularArticlesService.get();

  window: Window | null = this.document.defaultView;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private _userActivityService: UserActivityService,
    private _latestInfoService: LatestInfoService,
    private _recommendedResourcesService: RecommendedResourceService,
    private _recommendedPublicationsService: RecommendedPublicationsService,
    private _popularArticlesService: PopularArticlesService
  ) {}
}
