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
          <div class="col-7 widget-header">EOSC in Numbers</div>
          <div class="col-5" align="end">
            <span (click)="showMore()" class="widget-editable"
              >Show more
              <img id="show-more" src="assets/arrow_right_small.svg" />
            </span>
          </div>
        </div>
        <div class="row pt-4">
          <div class="col-12 widget-subheader">
            Thanks to your commitment we can realize our mission for FAIR and
            Open Science. At this moment together we have achieved
          </div>
        </div>
        <div class="row pt-4">
          <div class="col-12 img-padding">
            <div>
              <div class="row">
                <div class="col-4 align-center">
                  <img src="assets/articles_book.svg" />
                </div>
                <div class="col-8">
                  <div class="row pt-4">
                    <span class="widget-numbers">{{
                      this.results.publications
                    }}</span>
                  </div>
                  <div class="row">
                    <span class="widget-numbers-name">Publications</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row pt-2">
          <div class="col-12 img-padding">
            <div>
              <div class="row">
                <div class="col-4 align-center">
                  <img src="assets/Services.svg" />
                </div>
                <div class="col-8">
                  <div class="row pt-4">
                    <span class="widget-numbers">{{
                      this.results.services
                    }}</span>
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
          <div class="col-12 img-padding">
            <div>
              <div class="row">
                <div class="col-4 align-center">
                  <img src="assets/trainings.svg" />
                </div>
                <div class="col-8">
                  <div class="row pt-4">
                    <span class="widget-numbers">{{
                      this.results.trainings
                    }}</span>
                  </div>
                  <div class="row">
                    <span class="widget-numbers-name">Trainings</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row pt-2">
          <div class="col-12 img-padding">
            <div>
              <div class="row">
                <div class="col-4 align-center">
                  <img src="assets/cloud_share.svg" />
                </div>
                <div class="col-8">
                  <div class="row pt-4">
                    <span class="widget-numbers">{{
                      this.results.softwares
                    }}</span>
                  </div>
                  <div class="row">
                    <span class="widget-numbers-name">Software</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row pt-2">
          <div class="col-12 img-padding">
            <div>
              <div class="row">
                <div class="col-4 align-center">
                  <img src="assets/data.svg" />
                </div>
                <div class="col-8">
                  <div class="row pt-4">
                    <span class="widget-numbers">{{ this.results.data }}</span>
                  </div>
                  <div class="row">
                    <span class="widget-numbers-name">Data</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row pt-2">
          <div class="col-12 img-padding">
            <div>
              <div class="row">
                <div class="col-4 align-center">
                  <img src="assets/datasource.svg" />
                </div>
                <div class="col-8">
                  <div class="row pt-4">
                    <span class="widget-numbers">{{
                      this.results.datasources
                    }}</span>
                  </div>
                  <div class="row">
                    <span class="widget-numbers-name">Data Sources</span>
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
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #000;
      }
      .widget-numbers {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 20px;
        color: #232c34;
      }
      .widget-numbers-name {
        font-family: 'Inter';
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
  constructor(private _eoscNumbersService: EOSCNumbersWidgetService) {
    this.results = {
      services: 0,
      publications: 0,
      trainings: 0,
      softwares: 0,
      data: 0,
      datasources: 0,
    };
  }
  results: {
    services: number;
    publications: number;
    trainings: number;
    softwares: number;
    data: number;
    datasources: number;
  };

  ngOnInit() {
    this._eoscNumbersService.numbers$
      .pipe(
        untilDestroyed(this),
        // delay is required to have rerender out of angular's detection cycle
        delay(0)
      )
      .subscribe((numbers) => (this.results = numbers));
  }
  public showMore() {
    window.open('https://search.marketplace.eosc-portal.eu', '_blank');
  }
}
