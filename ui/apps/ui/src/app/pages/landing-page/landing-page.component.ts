import { Component } from '@angular/core';
import { environment } from '@environment/environment';

@Component({
  selector: 'ui-landing-page',
  template: `
    <main>
      <div id="topmap">
        <div class="container">
          <div class="row">
            <div class="col-sm">
              <div class="logo-eosc">
                <img src="assets/eosc-blue.svg" alt="EOSC">
              </div>
              <div class="intro">
                <h1>Welcome to EOSC<br>User Dashboard</h1>
                <div class="description">
                  The user panel gives you access to your activities, project management and selects the most interesting research resources for you.
                </div>
                <button class="btn btn-primary" (click)="login()">Login</button>
              </div>
            </div>
            <div class="col-sm">
              <div class="features-box">
                <div class="feature-line"><div class="dot"></div> Daily recommendations</div>
                <div class="feature-line"><div class="dot"></div>Events and news</div>
                <div class="feature-line last"><div class="dot"></div>Project management</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="manage">
        <div class="container">
          <div class="row">
            <div class="col-sm">
            ssss
            </div>
            <div class="col-sm">
              ssss
            </div>
          </div>
        </div>
      </div>
    </main>
  `,

})
export class LandingPageComponent {
  login() {
    window.location.href = `${environment.backendApiPath}/auth/request`;
  }
}

