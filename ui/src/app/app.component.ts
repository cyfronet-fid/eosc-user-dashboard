import {Component, Inject, OnInit} from '@angular/core';
import {IUserActivityResponse} from "./user-activity/user-activity.model";
import {Observable} from "rxjs";
import {UserActivityService} from "./user-activity/user-activity.service";
import {ILatestInfo} from "./latest-info/latest-info.model";
import {LatestInfoService} from "./latest-info/latest-info.service";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userActivities$: Observable<IUserActivityResponse[]> = this._userActivityService.get();
  latestInformations$: Observable<ILatestInfo[]> = this._latestInfoService.get();
  window: Window | null = this.document.defaultView;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private _userActivityService: UserActivityService,
    private _latestInfoService: LatestInfoService
  ) {}
}
