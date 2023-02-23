import { Component } from '@angular/core';

@Component({
  selector: 'ui-searchbar-with-logo',
  template: `<div class="gx-0 header-background">
    <div class="container">
      <div class="row">
        <div class="col-md-2 col-12 logo-col">
          <img width="169px" height="64px" src="assets/logo_eosc.svg" />
        </div>
        <div class="col-md-10 col-12 content-header-search" align="center">SEARCH</div>
      </div>
    </div>
  </div>`,
  styles: [
    `
      .header-background {
        background: #3d4db6;
        height: 117px;
        width: 100%;
        position: relative;
      }
      .logo-col {
        padding-top: 28px;
      }
      .content-header-search {
        padding-top: 40px;
      }
    `,
  ],
})
export class SearchbarWithLogoComponent {}
