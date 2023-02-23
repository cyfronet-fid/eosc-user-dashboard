import { Component, Inject, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserProfileService } from '../../auth/user-profile.service';
import { environment } from '@environment/environment';
import { Observable, delay } from 'rxjs';
import { UserProfile } from '../../auth/user-profile.types';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

@UntilDestroy()
@Component({
  selector: 'ui-widget-user-profile',
  template: `
    <div class="widget paddings">
      <!--div class="row">
        <div class="col-6 widget-header">Your profile</div>
        <div class="col-6" align="end">
          <span (click)="editProfile()" class="widget-editable"
            >Edit profile
            <img
              id="editable-widget-graphic"
              src="assets/widget-editable-icon.png"
            />
          </span>
        </div>
      </div-->
      <div class="row">
        <div class="pt-3 ps-4">
          <img width="34px" src="assets/user.svg" />
        </div>
        <div class="pt-2 ps-4">
          <span *ngIf="profile" class="widget-text ms-2">{{
            profile.username
          }}</span
          ><br />
          <span *ngIf="profile" class="widget-text ms-2"
            >{{ profile.email }}
          </span>
        </div>
      </div>
      <!--div class="row">
        <div class="pt-3">
          <img id="fav-widget-image" src="assets/widget-favourities.svg" />
          <span *ngIf="profile" class="fav-text ps-1"
            >{{ profile.fav }} Favourite Resources</span
          >
        </div>
      </div-->
      <div class="spacer"></div>
      <div class="row">
        <div class="pt-3">
          <span [routerLink]="['/dashboard']" routerLinkActive="nav-sel">
          </span>
          <span class="nav-text ps-4">Feed</span>
        </div>
      </div>
      <div class="spacer"></div>
      <div class="row">
        <div class="pt-3">
          <span [routerLink]="['/profile']" routerLinkActive="nav-sel"> </span>
          <span class="nav-text ps-4">Profile Settings</span>
        </div>
      </div>
      <div class="spacer"></div>
      <div class="row">
        <div class="pt-3">
          <span [routerLink]="['/favourities']" routerLinkActive="nav-sel">
          </span>
          <span class="nav-text ps-4">Favourities</span>
        </div>
      </div>
      <div style="margin-bottom: 200px"></div>
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
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 10px;
        line-height: 22px;
        color: #000000;
      }
      .nav-text {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #000000;
      }
      .nav-sel {
        position: absolute;
        width: 3px;
        height: 30px;
        left: 40px;
        background: #0066ff;
        border-radius: 4px;
      }
      .spacer {
        padding: 8px 4px;
        border-bottom: 1px solid #eef1f3;
      }
    `,
  ],
})
export class WidgetUserProfileComponent implements OnInit {
  backendUrl = `${environment.backendApiPath}`;
  profile: UserProfile;
  favNumber = 0;
  editLink: string | undefined;

  constructor(
    private _userProfileService: UserProfileService,
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.profile = {
      username: '',
      fav: 0,
      email: '',
      aai_id: '',
      edit_link: '',
    };
  }

  ngOnInit() {
    this._userProfileService.user$
      .pipe(
        untilDestroyed(this),
        // delay is required to have rerender out of angular's detection cycle
        delay(0)
      )
      .subscribe((profile) => {
        this.profile = profile;
        this.getJSON().subscribe((data) => {
          this.editLink = data['account-service'];
        });
      });
  }

  public triggerEdit() {
    if (this.editLink !== undefined) {
      this.document.location.href = this.editLink;
    }
  }
  public editProfile() {
    window.open('https://marketplace.eosc-portal.eu/profile', '_blank');
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getJSON(): Observable<any> {
    return this.http.get(this.profile.edit_link);
  }
}
