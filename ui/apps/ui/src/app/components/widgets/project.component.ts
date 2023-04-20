import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserProfileService } from '../../auth/user-profile.service';
import { delay } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'ui-project-widget',
  template: `
    <div>
      <div class="widget rounded paddings">
        <div class="row">
          <div class="col-6 widget-header">My Projects</div>
          <div class="col-6" align="end">
            <span (click)="showMore()" class="widget-editable"
              >All projects
              <img id="show-more" src="assets/arrow_right_small.svg" />
            </span>
          </div>
        </div>
        <div class="recommendation mb-0">
          <div class="ps-2 mb-2" align="center">
            <div class="border-img" (click)="addProject()">
              <div justify="center">
                <span class="add-project-text pe-2">Add Project</span>
                <img width="20px" height="20px" src="assets/add.svg" />
              </div>
            </div>
          </div>
          <div class="row pt-3">
            <div class="col-12 widget-subheader-text">
              Get the space to organize your services into logical blocks and
              the assistance of international technical teams to advise on the
              most suitable solutions.
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .widget-header-text {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 20px;
        color: #1a2128;
      }
      .widget-subheader-text {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 21px;
        text-align: center;
        color: black;
      }
      .button-contact {
        cursor: pointer;
        width: 110px;
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
      .border-img {
        background: rgba(25, 117, 255, 0.08);
        border-radius: 10px;
        padding-top: 3px;
        width: 149px;
        margin-top: 12px;
        height: 32px;
      }
      .add-project-text {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 18px;
        color: #144b9e;
      }
      .border-img:hover {
        cursor: pointer;
        background: rgba(25, 117, 255, 0.18);
      }
    `,
  ],
})
export class WidgetProjectComponent implements OnInit {
  constructor(private _userProfileService: UserProfileService) {}

  ngOnInit() {
    this._userProfileService.user$.pipe(
      untilDestroyed(this),
      // delay is required to have rerender out of angular's detection cycle
      delay(0)
    );
  }

  public showMore() {
    window.open('https://marketplace.eosc-portal.eu/projects/', '_blank');
  }
  public addProject() {
    window.open('https://marketplace.eosc-portal.eu/projects/new', '_blank');
  }
}
