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
              <div class="image-placeholder"></div>
            </div>
            <div class="col-sm">
              <h2>Manage. Discover. Measure.</h2>
              <ul class="check-list">
                <li>Get notified about news in your domain</li>
                <li>Read materials selected for you</li>
                <li>Manage your research projects</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div id="community">
        <div class="container">
          <div class="row">
            <h2>News. Events. Community</h2>
          </div>
        </div>
      </div>

      <div id="promo">

      </div>

      <div id="resources">
        <div class="container">
          <div class="row">
            <div class="col-sm">
              <div class="pre-title">Over 3339935 research resources</div>
              <h2>Publications, Softwares,<br> Data Sets, Trainings,<br> Services</h2>
            </div>
            <div class="col-sm">
              <p>Let us help you with technical resources and stay focused on what is really important for you. </p>
              <ul class="check-list">
                <li>Get notified about news in your domain</li>
                <li>Read materials selected for you</li>
                <li>Manage your research projects</li>
              </ul>
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

