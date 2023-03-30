import { Component, OnInit } from '@angular/core';
import { RecommendationsService } from '@components/recommendations-widget/recommendations.service';
import {
  IRecommendation,
  IRecommendationType,
} from '@components/recommendations-widget/types';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ui-widget-news',
  template: `
    <div>
      <div class="widget rounded paddings">
        <div class="row">
          <div class="col-6 widget-header">EOSC News</div>
          <div class="col-6" align="end">
            <span (click)="showMore()" class="widget-editable"
              >Show more
              <img id="show-more" src="assets/arrow_right_small.svg" />
            </span>
          </div>

          <div *ngFor="let item of slicedData">
            <div class="row pt-4">
              <div class="col-12">
                <img
                  style="cursor:pointer;"
                  (click)="moveToEvent(item.url)"
                  width="100%"
                  src="{{ item.image }}"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="row pt-3">
                  <span
                    class="widget-header-theme"
                    [innerHTML]="item.title"
                  ></span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="row pt-3">
                  <span
                    class="widget-header-place"
                    [innerHTML]="truncate(item.description, 500) + '...'"
                  ></span>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-3">
            <div>
              <div align="end">
                <span>
                  <button
                    [disabled]="!hasPrev"
                    class="btn px-0 py-0"
                    (click)="getPreviousData()"
                  >
                    <img
                      width="24px"
                      height="24px"
                      src="assets/left_icon.svg"
                    />
                  </button>
                  <button
                    [disabled]="!hasNext"
                    class="btn px-0 py-0"
                    (click)="getNextData()"
                  >
                    <img
                      width="24px"
                      height="24px"
                      src="assets/right_icon.svg"
                    />
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .widget-header-place {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 19px;
        color: #1a2128;
      }
      .widget-header-theme {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 20px;
        color: #000;
      }
      .going-text {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
        color: #919ba2;
      }
    `,
  ],
})
export class WidgetNewsComponent implements OnInit {
  idx = 0;
  slideCount = 1;
  slicedData: IRecommendation[] = [];
  recommendations: IRecommendation[] = [];
  activeType: IRecommendationType = 'news';

  constructor(private _recommendationsService: RecommendationsService) {
    this.slicedData = [];
  }

  ngOnInit() {
    this.activeType = 'news';
    this._recommendationsService
      .fetch$(this.activeType)
      .pipe(untilDestroyed(this))
      .subscribe((events) => {
        this.recommendations = events;
        this.slicedData = this.recommendations.slice(0, 1);
      });
  }

  public truncate(words: string, maxlength: number) {
    return `${words.slice(0, maxlength)}`;
  }

  public moveToEvent(path: string) {
    window.open(path, '_blank');
  }
  public showMore() {
    window.open('https://eosc-portal.eu/media/news', '_blank');
  }

  get hasNext() {
    return this.idx < this.recommendations.length - 1;
  }
  get hasPrev() {
    return this.idx > 0;
  }
  public getNextData() {
    if (this.idx < this.recommendations.length - 1) {
      this.idx++;
      this.slicedData = this.recommendations.slice(
        this.idx * this.slideCount,
        this.idx * this.slideCount + this.slideCount
      );
    }
  }
  public getPreviousData() {
    if (this.idx !== 0) {
      this.idx--;
      this.slicedData = this.recommendations.slice(
        this.idx * this.slideCount,
        this.idx * this.slideCount + this.slideCount
      );
    }
  }
}
