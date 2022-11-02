import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ui-dashboard',
  template: `
    <div class="row">
      <div class="col-2 ps-5 pt-4 pb-4">LOGO</div>
      <div class="col-6 px-2 pt-4 pb-4" align="center">SEARCH</div>
      <div class="col-2 px-2 pt-4 pb-4" align="center">Add Project</div>
      <div class="col-2 pe-5 pt-4 pb-4" align="right">ICONS</div>
    </div>
    <nav class="nav ps-4 pt-4">
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
      <div class="row">
        <div class="col-8 ps-5 pe-2 pt-4 pb-4">
          <div class="rounded background" id="container"></div>
        </div>
        <div class="col-4 ps-2 pe-5 pt-4 pb-4">
          <div class="rounded background" id="container"></div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      #container {
        height: calc(100vh - 200px);
      }
      .background {
        background-color: #eef1f3;
      }
      .rounded {
        border-radius: 20px !important;
      }
    `,
  ],
})
export class DashboardPageComponent {}
