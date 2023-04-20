import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserProfileService } from '../../auth/user-profile.service';
import { environment } from '@environment/environment';
import { delay } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'ui-widget-impact',
  template: `
    <div>
      <div class="widget rounded paddings widget-background">
        <div class="row" align="center">
          <div class="col-12 widget-header-text">
            Have an impact - We want to hear your story!
          </div>
        </div>
        <div class="row pt-3">
          <div class="col-12 widget-subheader-text">
            The EOSC Future project is actively seeking first-hand testimonials
            from the EOSC community
          </div>
        </div>
        <div class="row pt-4 mb-4" align="center">
          <div class="col-12">
            <div class="button-contact" (click)="contactUs()">
              <span class="button-text">Contact us</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .widget-background {
        background-color: white;
        background-image: url(/assets/visual-collaboration.png) !important;
        background-position: right bottom !important;
        background-repeat: no-repeat !important;
      }
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
        font-weight: 500;
        font-size: 14px;
        line-height: 21px;
        text-align: center;
        color: #919ba2;
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
export class WidgetImpactComponent implements OnInit {
  backendUrl = `${environment.backendApiPath}`;

  constructor(private _userProfileService: UserProfileService) {}

  ngOnInit() {
    this._userProfileService.user$.pipe(
      untilDestroyed(this),
      // delay is required to have rerender out of angular's detection cycle
      delay(0)
    );
  }

  public contactUs() {
    window.location.href = 'mailto:contact@eosc-portal.eu';
  }
}
