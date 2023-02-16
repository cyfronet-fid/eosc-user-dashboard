import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { environment } from '@environment/environment';
import { delay } from 'rxjs';
import { UpcomingEventsWidgetService } from '../../widgets/upcoming-events/upcoming-events-widget.service';
import { UpcomingEventsWidget } from '../../widgets/upcoming-events/upcoming-events-widget.types';

@UntilDestroy()
@Component({
  selector: 'ui-widget-upcoming-events',
  template: `
    <div>
      <div class="widget rounded paddings">
        <div class="row">
          <div class="col-6 widget-header">Upcoming Events</div>
          <div class="col-6" align="end">
            <span (click)="showMore()" class="widget-editable"
              >Show all
              <img id="show-more" src="assets/arrow_right_small.svg" />
            </span>
          </div>
        </div>

        <div *ngFor="let item of slicedData">
          <div class="row pt-4">
            <div class="col-12">
              <img
                (click)="moveToEvent(item.Path)"
                width="100%"
                height="100%"
                src="{{ item.Image }}"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="row pt-3">
                <span class="widget-header-place">{{ item.Date }}</span>
              </div>
              <div class="row">
                <span
                  class="widget-header-theme"
                  [innerHTML]="item.Title"
                ></span>
              </div>
              <div class="row pt-3">
                <div class="col-6">
                  <div (click)="interested()" class="interested">
                    <span class="interested-text">Interested?</span
                    ><img src="assets/interested.svg" />
                  </div>
                </div>
                <div class="col-4">
                  <div>
                    <span class="going-text">{{ 0 }} Going</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="row" align="end">
              <span>
                <button
                  [disabled]="!hasPrev"
                  class="btn px-0 py-0"
                  (click)="getPreviousData()"
                >
                  <img width="24px" height="24px" src="assets/left_icon.svg" />
                </button>
                <button
                  [disabled]="!hasNext"
                  class="btn px-0 py-0"
                  (click)="getNextData()"
                >
                  <img width="24px" height="24px" src="assets/right_icon.svg" />
                </button>
              </span>
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
        font-size: 14px;
        line-height: 26px;
        color: #1a2128;
      }
      .widget-header-theme {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 26px;
        color: #1a2128;
      }
      .interested {
        cursor: pointer;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 6px 16px;
        gap: 8px;
        background: rgba(25, 117, 255, 0.08);
        border-radius: 10px;
      }
      .interested-text {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 13px;
        line-height: 18px;
        color: #144b9e;
      }
      .going-text {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
        color: #919ba2;
      }
      #show-more {
        padding-right: 6px;
      }
    `,
  ],
})
export class WidgetUpcomingEventsComponent implements OnInit {
  backendUrl = `${environment.backendApiPath}`;
  upcomingEvents: UpcomingEventsWidget[];
  idx = 0;
  slideCount = 1;
  slicedData: UpcomingEventsWidget[];

  constructor(private _widgetEventsService: UpcomingEventsWidgetService) {
    this.upcomingEvents = [];
    this.slicedData = [];
  }

  ngOnInit() {
    this._widgetEventsService.events$
      .pipe(
        untilDestroyed(this),
        // delay is required to have rerender out of angular's detection cycle
        delay(0)
      )
      .subscribe((events) => {
        this.upcomingEvents = events.reverse();
        this.slicedData = this.upcomingEvents.slice(0, 1);
      });
  }

  public showMore() {
    window.open('https://eosc-portal.eu/media/events', '_blank');
  }
  public moveToEvent(path: string) {
    window.open('http://eosc-portal.eu' + path, '_blank');
  }

  public interested() {
    console.log('interested');
  }
  get hasNext() {
    return this.idx < this.upcomingEvents.length - 1;
  }
  get hasPrev() {
    return this.idx > 0;
  }
  public getNextData() {
    if (this.idx < this.upcomingEvents.length - 1) {
      this.idx++;
      this.slicedData = this.upcomingEvents.slice(
        this.idx * this.slideCount,
        this.idx * this.slideCount + this.slideCount
      );
    }
  }
  public getPreviousData() {
    if (this.idx !== 0) {
      this.idx--;
      this.slicedData = this.upcomingEvents.slice(
        this.idx * this.slideCount,
        this.idx * this.slideCount + this.slideCount
      );
    }
  }
}
