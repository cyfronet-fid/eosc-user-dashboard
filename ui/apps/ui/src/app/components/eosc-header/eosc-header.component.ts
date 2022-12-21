import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ui-eosc-header',
  template: `
    <div class="row gx-0 header-background">
      <div class="ps-4 content-header">
        <img width="169px" height="64px" src="assets/logo_eosc.svg" />
      </div>
      <div class="content-header-search" align="center">SEARCHxxxxx</div>
    </div>
    <nav class="nav ps-5 mt-2 mb-2">
      <a
        [routerLink]="['/dashboard']"
        routerLinkActive="is-active"
        class="nav-link"
        ><img width="16px" height="16px" src="assets/CodesandboxLogo.svg" />
        Feed</a
      >
      <a class="nav-link disabled"
        ><img width="16px" height="16px" src="assets/Circle.svg" /> Projects</a
      >
      <a class="nav-link disabled"
        ><img width="16px" height="16px" src="assets/Circle.svg" /> Trainings</a
      >
      <a class="nav-link disabled"
        ><img width="16px" height="16px" src="assets/Circle.svg" /> Services</a
      >
      <a class="nav-link disabled"
        ><img width="16px" height="16px" src="assets/Circle.svg" /> Orders</a
      >
      <a class="nav-link disabled"
        ><img width="16px" height="16px" src="assets/Circle.svg" />
        Statistics</a
      >
      <a class="nav-link disabled"
        ><img width="16px" height="16px" src="assets/Circle.svg" /> Calendar</a
      >
      <a class="nav-link disabled"
        ><img width="16px" height="16px" src="assets/Circle.svg" /> Community</a
      >
      <a class="nav-link disabled"
        ><img width="16px" height="16px" src="assets/Circle.svg" />
        Favourities</a
      >
    </nav>
  `,
  styles: [
    `
      .header-background {
        background: #3d4db6;
        height: 117px;
        width: 100%;
        position: relative;
      }
      .content-header {
        position: absolute;
        top: 25%;
      }
      .content-header-search {
        position: absolute;
        top: 40%;
        left: 0%;
      }
      .nav-link {
        font-size: 14px;
        border-bottom: 2px solid white;
      }
      .nav-link:hover {
        border-bottom: 2px solid #3d4db6;
      }
      .nav-link.disabled {
        color: #828282;
      }
      .is-active {
        border-bottom: 2px solid #3d4db6;
      }
    `,
  ],
})
export class EoscHeaderComponent {}
