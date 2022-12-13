import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ui-eosc-community-sshoc-widget',
  template: `
    <div class="widget rounded fixed-size gx-0">
      <div class="row">
        <div class="col-5 ps-4 pt-3 pb-3">
          <img
            width="182px"
            height="168px"
            src="assets/sshoc-stakeholders.svg"
          />
        </div>
        <div class="col-7 ps-3 pt-4">
          <div class="row pe-3">
            <span class="theme-community"
              >SSHOC – towards the complete SSH ecosystem</span
            >
          </div>
          <div class="row pe-3 pt-2">
            <span class="text-community"
              >Social Sciences & Humanities Open Cloud is a project that unites
              20 partner organizations and their 27 associates in developing the
              social sciences and humanities area of the European Open Science
              Cloud.
            </span>
          </div>
          <div class="pe-3 pt-2">
            <span (click)="readMore()" class="link-community"
              >Read more<img
                width="14px"
                height="12px"
                class="right-arrow"
                src="assets/right-community.svg"
            /></span>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  `,
  styles: [
    `
      .right-arrow {
        padding-left: 4px;
        padding-bottom: 4px;
      }
      .fixed-size {
        display: block;
        width: 457px;
        height: 198px;
      }
      .theme-community {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 15px;
        color: #232c34;
      }
      .text-community {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 9px;
        line-height: 14px;
        color: #232c34;
        opacity: 0.9;
      }
      .link-community {
        font-family: 'Inter';
        display: inline-block;
        font-style: normal;
        font-weight: 500;
        font-size: 10px;
        line-height: 18px;
        color: #3d4db6;
      }
      .link-community:hover {
        cursor: pointer;
        border-bottom: 1px solid #3d4db6;
        color: #3d4db6;
      }
    `,
  ],
})
export class EoscCommunitySSHOCWidgetComponent {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  public readMore() {
    this.document.location.href = 'https://www.sshopencloud.eu/';
  }
}
