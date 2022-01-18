import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {IUserActivityResponse} from "../user-activity/user-activity.model";
import {ILatestInfo} from "../latest-info/latest-info.model";
import {IRecommendedResource} from "../reommended-resources/recommended-resource.model";
import {IRecommendedPublication} from "../recommended-publications/recommended-publication.model";
import {IPopularArticle} from "../popular-articles/popular-articles.model";
import {DOCUMENT} from "@angular/common";
import {UserActivityService} from "../user-activity/user-activity.service";
import {LatestInfoService} from "../latest-info/latest-info.service";
import {RecommendedResourceService} from "../reommended-resources/recommended-resource.service";
import {RecommendedPublicationsService} from "../recommended-publications/recommended-publications.service";
import {PopularArticlesService} from "../popular-articles/popular-articles.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
})
export class MainPageComponent implements OnInit {

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

  ngOnInit(): void {
  }

}
