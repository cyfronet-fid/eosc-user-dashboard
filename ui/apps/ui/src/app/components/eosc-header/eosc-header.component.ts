import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ui-eosc-header',
  template: `
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
