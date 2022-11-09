import { Component, ViewEncapsulation } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ui-dashboard',
  template: `
    <div class="row gx-0">
      <div class="col-2 ps-4 pt-4 pb-4">LOGO</div>
      <div class="col-6 px-2 pt-4 pb-4" align="center">SEARCH</div>
      <div class="col-2 px-2 pt-4 pb-4" align="center">Add Project</div>
      <div class="col-2 pe-4 pt-4 pb-4" align="right">ICONS</div>
    </div>
    <nav class="nav ps-2 pt-4">
      <a class="nav-link">Feed</a>
      <a class="nav-link">Projects</a>
      <a class="nav-link disabled">Trainings</a>
      <a class="nav-link disabled">Services</a>
      <a class="nav-link disabled">Orders</a>
      <a class="nav-link disabled">Statistics</a>
      <a class="nav-link disabled">Calendar</a>
      <a class="nav-link disabled">Community</a>
      <a class="nav-link disabled">Favourities</a>
    </nav>
    <div id="background">
      <div class="row gx-0">
        <div class="col-8 ps-4 pe-2 pt-4 pb-4">
          <div class="rounded widget" id="container"></div>
        </div>
        <div class="col-4 ps-2 pe-4 pt-4 pb-4">
          <div class="mb-3">
            <ui-widget-user-profile></ui-widget-user-profile>
          </div>
          <div class="mb-3">
            <ui-widget-eosc-numbers></ui-widget-eosc-numbers>
          </div>
          <div class="mb-3">
            <ui-widget-upcoming-events></ui-widget-upcoming-events>
          </div>
          <div class="mb-3">
            <ui-widget-impact></ui-widget-impact>
          </div>
          <div class="mb-3">
            <ui-widget-videos></ui-widget-videos>
          </div>
          <div class="mb-3">
            <ui-widget-social-media></ui-widget-social-media>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      #container {
        height: auto;
      }
      #background {
        background-color: #eef1f3;
      }
      .rounded {
        border-radius: 10px !important;
      }
      .widget {
        background-color: white;
      }
      .paddings {
        padding: 24px;
      }
      .widget-header {
        font-family: 'Switzer';
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 20px;
        color: #1a2128;
      }
      .widget-editable {
        font-family: 'Switzer';
        font-style: normal;
        font-weight: 600;
        font-size: 13px;
        line-height: 18px;
        color: #919ba3;
      }
      .widget-editable:hover {
        border-bottom: 1.5px solid #919ba3;
        cursor: pointer;
      }
      .widget-text {
        font-family: 'Switzer';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: #1a2128;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardPageComponent {}
