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
                <div class="icon">
                  <img src="assets/providers.png" alt="Provider" />
                </div>
                <div class="title">Provider</div>
                <div class="desc">
                  Advertise your resources on the EOSC Portal and promote them, reaching a wider user base. Get statistics about access requests and customer feedback. Get a free platform where you can manage service requests and interact with users.
                </div>
                <div class="btn btn-sm-landing btn-secondary">Providers Hub</div>
              </a>
            </div>
            <div class="col-sm">
              <a href="#" class="tile right-tile">
                <div class="icon">
                  <img src="assets/researchers.png" alt="Researcher" />
                </div>
                <div class="title">Researcher</div>
                <div class="desc">
                  Get access to a wide web of FAIR data and other resources, ranging from High Technology and Engineering to Social Sciences. Find EOSC Services that suit your use case yourself or describe your use case and get support from our experts.
                </div>
                <div class="btn btn-sm-landing btn-secondary">Create Research Project</div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div id="support">
        <div class="container">
          <div class="row">
            <div class="col-sm-5">
              <h3>We provide you a full support on each research step</h3>
              <a href="#" class="btn btn-sm-landing btn-secondary">Contact with our experts</a>
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
                <img src="assets/ico-molecular.svg" alt="Medical">
                Medical<br />
                & Health Sciences
              </a>
              <a href="#" class="card">
                <img src="assets/ico-technology.svg" alt="Engineering">
                Engineering<br />
                & Technology
              </a>
              <a href="#" class="card">
                <img src="assets/ico-microscope.svg" alt="Natural Sciences">
                Natural Sciences
              </a>
            </div>
            <div class="cards-wrapper">
              <a href="#" class="card">
                <img src="assets/ico-artificial-intelligence.svg" alt="Humanities">
                Humanities
              </a>
              <a href="#" class="card">
                <img src="assets/ico-agriculture.svg" alt="Agricultural">
                Agricultural<br />Sciences
              </a>
              <a href="#" class="card">
                <img src="assets/ico-social-science.svg" alt="Social Sciences">
                Social Sciences
              </a>
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
