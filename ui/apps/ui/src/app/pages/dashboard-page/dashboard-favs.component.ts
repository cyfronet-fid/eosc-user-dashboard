import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RecommendationsService } from '@components/recommendations-widget/recommendations.service';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  template: `
    <div>
      <div class="rounded widget" id="container" *mcRerender="trigger">
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
          [accessTags]="recommendation.accesstags"
          [secondaryTags]="recommendation.sectags"
          [tertiaryTags]="recommendation.terttags ?? []"
        ></ui-recommendation>
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
  constructor(private _recommendationsService: RecommendationsService) {
    this.trigger = 1;
    this._recommendationsService.favevent.subscribe({
      next: () => {
        this.callgetFavs();
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  storedfavs: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recommendations: any[] = [];
  trigger: number;

  ngOnInit(): void {
    this.callgetFavs();
  }

  public rerender(): void {
    this.trigger++;
  }

  callgetFavs() {
    this._recommendationsService
      .favget$()
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .subscribe((storedfavs) => {
        this.storedfavs = storedfavs;
        this.mergeFavs(storedfavs);
        this.rerender();
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
