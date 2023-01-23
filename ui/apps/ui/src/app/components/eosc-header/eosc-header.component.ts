import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ui-eosc-header',
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-9">
          <nav class="nav ps-2 mt-2 mb-2">
            <a
              [routerLink]="['/dashboard']"
              routerLinkActive="is-active"
              class="nav-link"
              ><img width="16px" height="16px" src="assets/CodesandboxLogo.svg" />
              Feed</a
            >
            <a class="nav-link disabled"
              ><img width="16px" height="16px" src="assets/Circle.svg" />
              Projects</a
            >
            <a class="nav-link disabled"
              ><img width="16px" height="16px" src="assets/Circle.svg" />
              Trainings</a
            >
            <a class="nav-link disabled"
              ><img width="16px" height="16px" src="assets/Circle.svg" />
              Services</a
            >
            <a class="nav-link disabled"
              ><img width="16px" height="16px" src="assets/Circle.svg" />
              Orders</a
            >
            <a class="nav-link disabled"
              ><img width="16px" height="16px" src="assets/Circle.svg" />
              Statistics</a
            >
            <a class="nav-link disabled"
              ><img width="16px" height="16px" src="assets/Circle.svg" />
              Calendar</a
            >
            <a class="nav-link disabled"
              ><img width="16px" height="16px" src="assets/Circle.svg" />
              Community</a
            >
            <a class="nav-link disabled"
              ><img width="16px" height="16px" src="assets/Circle.svg" />
              Favourities</a
            >
          </nav>
        </div>
        <div class="col-3" justify="center">
          <div class="row justify-content-end pe-4">
            <div class="col-6">
              <div class="ps-2 mb-2" align="center">
                <div class="border-img" (click)="addProject()">
                  <div justify="center">
                    <span class="add-project-text pe-2">Add Project</span>
                    <img width="20px" height="20px" src="assets/add.svg" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-1">
              <div class="pe-1 mt-3 mb-2" align="center">
                <div>
                  <img
                    width="20px"
                    height="20px"
                    color="#232C34"
                    src="assets/msg.png"
                  />
                </div>
              </div>
            </div>
            <div class="col-1">
              <div class="ps-1 pe-1 mt-3 mb-2" align="center">
                <div>
                  <img
                    width="20px"
                    height="20px"
                    color="#232C34"
                    src="assets/ring.png"
                  />
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
export class EoscHeaderComponent {
  public addProject() {
    window.open('https://marketplace.eosc-portal.eu/projects/new', '_blank');
  }
}
