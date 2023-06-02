import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RecommendationsService } from '@components/recommendations-widget/recommendations.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserProfileService } from '../../auth/user-profile.service';
import { delay } from 'rxjs';

@UntilDestroy()
@Component({
  template: `
    <div>
      <div class="rounded widget" id="container" *mcRerender="trigger">
        <h1 class="page-title">Favourites</h1>
        <div *ngIf="recommendations.length === 0" class="empty-placeholder">

          <div class="placeholder-image">
            <img src="assets/empty-list.svg" alt="empty list">
          </div>
          <h2>You haven't added any favourites yet!</h2>
          <p>Keep all of the resources that has caught your eye, just click the favourite icon on the resource box.</p>
            <a href="/dashboard" class="btn btn-primary">Browse selected for you</a>
        </div>
        <div *ngIf="recommendations.length > 0">
          <ui-recommendation
            *ngFor="let recommendation of recommendations"
            [title]="recommendation.title"
            [url]="recommendation.url"
            [image]="recommendation.img"
            [pubdate]="recommendation.pubdate"
            [type]="recommendation.type"
            [id]="recommendation.id"
            [visitid]="recommendation.visitid"
            [description]="recommendation.description"
            [tags]="recommendation.tags"
            [favs]="storedfavs"
            [dis]="storeddis"
            [jwttoken]="jwttoken"
            [accessTags]="recommendation.accesstags"
            [secondaryTags]="recommendation.sectags"
            [tertiaryTags]="recommendation.terttags ?? []"
          ></ui-recommendation>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      #container {
        margin-bottom: 12px;
        padding: 20px;
        border-radius: 5px;
        background: white;
      }
      .rounded {
        border-radius: 16px !important;
      }
      .widget {
        background-color: white;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardFavsComponent implements OnInit {
  constructor(
    private _recommendationsService: RecommendationsService,
    private _userProfileService: UserProfileService
  ) {
    this.trigger = 1;
    this._recommendationsService.favevent.subscribe({
      next: () => {
        this.callgetFavs();
        this.callgetDis();
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  storedfavs: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  storeddis: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recommendations: any[] = [];
  trigger: number;
  jwttoken!: string;

  ngOnInit(): void {
    this.callgetFavs();
    this.callgetDis();
  }

  public rerender(): void {
    this.trigger++;
  }

  callgetFavs() {
    this._userProfileService.user$
      .pipe(
        untilDestroyed(this),
        // delay is required to have rerender out of angular's detection cycle
        delay(0)
      )
      .subscribe((profile) => {
        this.jwttoken = profile.jwttoken;
        this._recommendationsService
          .favget$(this.jwttoken)
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          .subscribe((storedfavs) => {
            this.storedfavs = storedfavs;
            this.mergeFavs(storedfavs);
            this.rerender();
          });
      });
  }

  callgetDis() {
    this._userProfileService.user$
      .pipe(
        untilDestroyed(this),
        // delay is required to have rerender out of angular's detection cycle
        delay(0)
      )
      .subscribe((profile) => {
        this.jwttoken = profile.jwttoken;
        this._recommendationsService
          .disget$(this.jwttoken)
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          .subscribe((storeddis) => {
            this.storeddis = storeddis;
            this.rerender();
          });
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mergeFavs(storedf: any) {
    this.recommendations = [];
    this.recommendations.push(...storedf.favorites['datasets']);
    this.recommendations.push(...storedf.favorites['datasources']);
    this.recommendations.push(...storedf.favorites['other']);
    this.recommendations.push(...storedf.favorites['publications']);
    this.recommendations.push(...storedf.favorites['services']);
    this.recommendations.push(...storedf.favorites['software']);
    this.recommendations.push(...storedf.favorites['trainings']);
  }
}
