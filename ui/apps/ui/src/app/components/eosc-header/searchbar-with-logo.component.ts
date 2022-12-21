import { Component } from '@angular/core';

@Component({
  selector: 'ui-searchbar-with-logo',
  template: `<div class="row gx-0 header-background">
    <div class="ps-4 content-header">
      <img width="169px" height="64px" src="assets/logo_eosc.svg" />
    </div>
    <div class="content-header-search" align="center">SEARCHxxxxx</div>
  </div>`,
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
    `,
  ],
})
export class SearchbarWithLogoComponent {}
