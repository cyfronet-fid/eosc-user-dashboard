import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserProfileService } from '../../auth/user-profile.service';
import { environment } from '@environment/environment';
import { delay } from 'rxjs';
import { UserProfile } from '../../auth/user-profile.types';

@UntilDestroy()
@Component({
  selector: 'ui-widget-user-profile',
  template: `
    <div class="widget rounded paddings">
      <div class="row">
        <div class="col-6 widget-header">Your profile</div>
        <div class="col-6" align="end">
          <span (click)="triggerEdit()" class="widget-editable"
            >Edit profile
            <img
              id="editable-widget-graphic"
              src="assets/widget-editable-icon.png"
            />
          </span>
        </div>
      </div>
      <div class="row">
        <div class="pt-3">
          <img id="editable-widget-image" class="flex" />
          <span *ngIf="profile" class="widget-text ms-2">{{
            profile.username
          }}</span
          ><br />
          <span *ngIf="profile" class="widget-text ms-2"
            >jakisemail@fkfk.com</span
          >
        </div>
      </div>
      <div class="row">
        <div class="pt-3">
          <img id="fav-widget-image" src="assets/widget-favourities.svg" />
          <span class="fav-text ps-1"
            >{{ this.favNumber }} Favourite Resources</span
          >
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      #editable-widget-graphic {
        padding-right: 6px;
      }
      #editable-widget-image {
        width: 64px;
        height: 64px;
        background: #d9d9d9;
      }
      #fav-widget-image {
        width: 10.67px;
        height: 13.33px;
      }
      .flex {
        float: left;
      }
      .fav-text {
        font-family: 'Switzer';
        font-style: normal;
        font-weight: 400;
        font-size: 10px;
        line-height: 22px;
        color: #000000;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class WidgetUserProfileComponent implements OnInit {
  backendUrl = `${environment.backendApiPath}`;
  profile: UserProfile | undefined;
  favNumber = 0;

  constructor(private _userProfileService: UserProfileService) {}

  ngOnInit() {
    this._userProfileService.user$
      .pipe(
        untilDestroyed(this),
        // delay is required to have rerender out of angular's detection cycle
        delay(0)
      )
      .subscribe((profile) => (this.profile = profile));
  }

  public triggerEdit() {
    console.log('triggered');
  }
}
