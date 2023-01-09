import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { delay } from 'rxjs';
import { EOSCNumbersWidgetService } from '../../widgets/eosc-numbers/eosc-numbers-widget.service';

@UntilDestroy()
@Component({
  selector: 'ui-widget-eosc-numbers',
  template: `
    <div>
      <div class="widget rounded paddings">
        <div class="row">
          <div class="col-12 widget-header">EOSC in Numbers</div>
        </div>
        <div class="row pt-2">
          <div class="col-12 widget-subheader">
            Thanks to your commitment we can realize our mission for FAIR and
            Open Science. At this moment together we have achieved
          </div>
        </div>
        <div class="row pt-2">
          <div class="col-6 img-padding">
            <div class="border-img">
              <div class="row">
                <div class="col-6">
                  <img
                    width="100%"
                    height="100%"
                    src="assets/articles_book.svg"
                  />
                </div>
                <div class="col-6">
                  <div class="row pt-4">
                    <span class="widget-numbers">2659</span>
                  </div>
                  <div class="row">
                    <span class="widget-numbers-name">Publications</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6 img-padding">
            <div class="border-img">
              <div class="row">
                <div class="col-6">
                  <img width="100%" height="100%" src="assets/Services.svg" />
                </div>
                <div class="col-6">
                  <div class="row pt-4">
                    <span class="widget-numbers">359</span>
                  </div>
                  <div class="row">
                    <span class="widget-numbers-name">Services</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row pt-2">
          <div class="col-6 img-padding">
            <div class="border-img">
              <div class="row">
                <div class="col-6">
                  <img width="100%" height="100%" src="assets/trainings.svg" />
                </div>
                <div class="col-6">
                  <div class="row pt-4">
                    <span class="widget-numbers">133</span>
                  </div>
                  <div class="row">
                    <span class="widget-numbers-name">Trainings</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6 img-padding">
            <div class="border-img">
              <div class="row">
                <div class="col-6">
                  <img
                    width="100%"
                    height="100%"
                    src="assets/cloud_share.svg"
                  />
                </div>
                <div class="col-6">
                  <div class="row pt-4">
                    <span class="widget-numbers">149</span>
                  </div>
                  <div class="row">
                    <span class="widget-numbers-name">Software</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .border-img {
        border: 1.2px solid #eef1f3;
        border-radius: 8px;
      }
      .widget-subheader {
        font-family: 'Switzer';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 21px;
        color: #8e8d8a;
      }
      .widget-numbers {
        font-family: 'Switzer';
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 20px;
        color: #232c34;
      }
      .widget-numbers-name {
        font-family: 'Switzer';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 21px;
        color: #8e8d8a;
      }
      .img-padding {
        padding-left: 4px !important;
        padding-right: 4px !important;
      }
    `,
  ],
})
export class WidgetEoscNumbersComponent implements OnInit {
  constructor(private _eoscNumbersService: EOSCNumbersWidgetService) {}

  ngOnInit() {
    this._eoscNumbersService.numbers$
      .pipe(
        untilDestroyed(this),
        // delay is required to have rerender out of angular's detection cycle
        delay(0)
      )
      .subscribe((numbers) => console.log(numbers));
  }
}
