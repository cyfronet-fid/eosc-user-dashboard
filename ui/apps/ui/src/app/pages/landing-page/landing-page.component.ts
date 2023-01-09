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
                <img src="assets/eosc-blue.svg" alt="EOSC" />
              </div>
              <div class="intro">
                <h1>Welcome to EOSC<br />User Dashboard</h1>
                <div class="description">
                  The user panel gives you access to your activities, project
                  management and selects the most interesting research resources
                  for you.
                </div>
                <button class="btn btn-primary" (click)="login()">Login</button>
              </div>
            </div>
            <div class="col-sm">
              <div class="features-box">
                <div class="feature-line">
                  <div class="dot"></div>
                  Daily recommendations
                </div>
                <div class="feature-line">
                  <div class="dot"></div>
                  Events and news
                </div>
                <div class="feature-line last">
                  <div class="dot"></div>
                  Project management
                </div>
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
        <ui-eosc-community-widget></ui-eosc-community-widget>
      </div>

      <div id="promo"></div>

      <div id="resources">
        <div class="container">
          <div class="row">
            <div class="col-sm">
              <div class="pre-title">Over 3339935 research resources</div>
              <h3>
                Publications, Software,<br />
                Data Sets, Trainings,<br />
                Services
              </h3>
              <form class="search-form">
                <input
                  class="nosubmit"
                  type="search"
                  placeholder="Search for resources in all catalogs"
                />
              </form>
            </div>
            <div class="col-sm right-column">
              <p>
                Let us help you with technical resources and stay focused on
                what is really important for you.
              </p>
              <ul class="check-list">
                <li>Advanced Search Engine</li>
                <li>Over 3339935 research resources</li>
                <li>Intelligent offers management and support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div id="join">
        <div class="container">
          <div class="row">
            <h3>Join our community</h3>
            <div class="col-sm">
              <a href="#" class="tile left-tile">
                <div class="title">Provider</div>
              </a>
            </div>
            <div class="col-sm">
              <a href="#" class="tile right-tile">
                <div class="title">Researcher</div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div id="support">
        <div class="container">
          <div class="row">
            <div class="col-sm">
              <img src="assets/illustration-support.svg" alt="support" class="img-fluid"/>
            </div>
            <div class="col-sm right-column">
              <h3>We provide you a full support on each research step</h3>
              <a href="#" class="btn btn-secondary">Contact with our experts</a>
            </div>
          </div>
        </div>
      </div>

      <div id="up-to-date">
        <div class="container">
          <div class="row">
            <h3>Stay up to date on what is current in your research field</h3>
            <div class="cards-wrapper">
              <a href="#" class="card">
                Medical<br />
                & Health Sciences
              </a>
              <a href="#" class="card">
                Engineering<br />
                & Technology
              </a>
              <a href="#" class="card"> Natural Sciences </a>
            </div>
            <div class="cards-wrapper">
              <a href="#" class="card"> Humanities </a>
              <a href="#" class="card"> Agricultural<br />Sciences </a>
              <a href="#" class="card"> Social Sciences </a>
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
