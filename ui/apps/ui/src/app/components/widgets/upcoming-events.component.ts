import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserProfileService } from '../../auth/user-profile.service';
import { environment } from '@environment/environment';
import { Observable, delay } from 'rxjs';

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
              >Show more
              <img id="show-more" src="assets/arrow_right_small.svg" />
            </span>
          </div>
        </div>
        <div class="row pt-4">
          <div class="col-12">
            <img width="100%" height="100%" src="assets/events1.png" />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="row pt-3">
              <span class="widget-header-place"
                >25-26.11.2022 Paris, France</span
              >
            </div>
            <div class="row">
              <span class="widget-header-theme">Final Conference</span>
            </div>
            <div class="row pt-3">
              <div class="col-6">
                <div (click)="interested()" class="interested">
                  <span class="interested-text">Interested?</span
                  ><img src="assets/interested.svg" />
                </div>
              </div>
              <div class="col-4">
                <div><span class="going-text">36 Going</span></div>
              </div>
            </div>
            <div class="row" align="end">
              <span>
                <button
                  [disabled]="!isNext()"
                  type="button"
                  class="btn px-0 py-0"
                  (click)="getNext()"
                >
                  <img width="24px" height="24px" src="assets/left_icon.svg" />
                </button>
                <button
                  [disabled]="!isPrev()"
                  type="button"
                  class="btn px-0 py-0"
                  (click)="getPrev()"
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
        font-family: 'Switzer';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 26px;
        color: #1a2128;
      }
      .widget-header-theme {
        font-family: 'Switzer';
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
        font-family: 'Switzer';
        font-style: normal;
        font-weight: 600;
        font-size: 13px;
        line-height: 18px;
        color: #144b9e;
      }
      .going-text {
        font-family: 'Switzer';
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
  // TODO To be replaced by Interface and Service
  upcomingEvents!: Observable<
    {
      id: string;
      img: string;
      date: string;
      theme: string;
      going: number;
    }[]
  >;

  constructor(private _userProfileService: UserProfileService) {}

  ngOnInit() {
    this._userProfileService.user$
      .pipe(
        untilDestroyed(this),
        // delay is required to have rerender out of angular's detection cycle
        delay(0)
      )
      .subscribe((profile) => console.log(profile));
    //this.upcomingEvents = this._widgetEventsService.getEvents();
  }

  public showMore() {
    console.log('showMore');
  }
  public interested() {
    console.log('interested');
  }
  public isNext() {
    return true;
  }
  public isPrev() {
    return true;
  }
  public getNext() {
    console.log('next');
  }
  public getPrev() {
    console.log('prev');
  }
}
