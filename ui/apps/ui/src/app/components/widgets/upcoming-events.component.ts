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
          <div class="col-7 widget-header">Upcoming Events</div>
          <div class="col-5" align="end">
            <span (click)="showMore()" class="widget-editable"
              >Show more
              <img id="show-more" src="assets/arrow_right_small.svg" />
            </span>
          </div>
        </div>

        <div *ngFor="let item of slicedData">
          <div class="row pt-4">
            <div class="col-12">
              <img
                style="cursor:pointer;"
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
              <div class="row pt-2">
                <span
                  class="widget-header-theme"
                  [innerHTML]="item.Title"
                ></span>
              </div>
              <!--div class="row pt-3">
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
              </div-->
            </div>
          </div>
        </div>
        <div class="row" *ngIf="slicedData.length === 0">
          <div class="col-12">
            <div class="row pt-4 mb-2" align="center">
              <div class="col-12">
                <div>
                  <img src="assets/noevents.svg" />
                </div>
                <div class="pt-2">
                  <span class="span-text"
                    >There are no upcoming events yet. Sign up to the newsletter
                    and we will notify you about future events</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row" *ngIf="slicedData.length === 0">
          <div class="col-12">
            <div class="row pt-2 mb-4" align="center">
              <div class="col-12">
                <div class="button-contact" (click)="subscribe()">
                  <span class="button-text">Sign up to newsletter</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row" *ngIf="slicedData.length > 0">
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
      .span-text {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        text-align: center;
        color: #000000;
      }
      .widget-header-place {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
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
      .button-contact {
        cursor: pointer;
        width: 210px;
        height: 38px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 10px 20px;
        gap: 8px;
        background: #185fc9;
        border-radius: 10px;
      }
      .button-contact:hover {
        background: #1a2128;
      }
      .button-text {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 18px;
        color: #ffffff;
        flex: none;
        order: 0;
        flex-grow: 0;
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
  public subscribe() {
    window.open('https://eosc-portal.eu/subscribe', '_blank');
  }
}
