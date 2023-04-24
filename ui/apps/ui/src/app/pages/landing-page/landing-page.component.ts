import { Component } from '@angular/core';
import { environment } from '@environment/environment';

@Component({
  selector: 'ui-landing-page',
  template: `
    <main>
      <div id="topmap">
        <div class="container">
          <div class="row stars-bg">
            <div class="col-sm-8">
              <div class="logo-eosc">
                <img src="assets/eosc-blue.svg" alt="EOSC" />
              </div>
              <div class="intro">
                <h1>Welcome to the EOSC<br />User Dashboard</h1>
                <div class="description">
                  Access your activity history, manage your research projects
                  and get resource recommendations.
                </div>
                <button class="btn btn-primary" (click)="login()">Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="manage">
        <div class="container">
          <div class="row">
            <div class="col-md-7">
              <div class="image-placeholder">
                <img src="assets/dashboard-view.png" alt="Dashboard view" />
              </div>
            </div>
            <div class="col-md-5">
              <h2>Manage. Discover. Measure.</h2>
              <ul class="check-list">
                <li>Get notified about news in your domain</li>
                <li>Read materials recommended for you</li>
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
            <p class="sub-title">
              Stay up to date with what's going on in your domain, participate
              in numerous subject-specific events and related learning
              activities, and join the community to advance Open science.
            </p>
          </div>
          <ui-eosc-community-widget></ui-eosc-community-widget>
        </div>
      </div>

      <div id="resources">
        <div class="container">
          <div class="row">
            <div class="col-sm">
              <div class="pre-title">Over 3339935 research resources</div>
              <h3>
                Publications,<br />Software, Data Sets,<br />
                Learning Resources,<br />
                Services
              </h3>
              <form class="search-form">
                <input
                  class="nosubmit"
                  type="search"
                  name="searchValue"
                  #searchValue
                  (search)="onSearchCustomer(searchValue.value)"
                  placeholder="Search for resources in all catalogs"
                />
                <button
                  type="submit"
                  (click)="onSearchCustomer(searchValue.value)"
                >
                  Search
                </button>
              </form>
            </div>
            <div class="col-sm right-column">
              <p>
                Let us help you access the technical resources your need, so you
                can stay focused on your research
              </p>
              <ul class="check-list">
                <li>Advanced Search Engine</li>
                <li>Over 3 milion research resources</li>
                <li>Intelligent resource access management and support</li>
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
                  Advertise your resources on the EOSC Portal and promote them,
                  reaching a wider user base. Get statistics about access
                  requests and User feedback. Get free use of a platform where
                  you can manage service requests and interact with your users.
                </div>
                <a
                  href="{{ betaProviders }}"
                  class="btn btn-sm-landing btn-secondary"
                >
                  Go to Provider’s Hub
                </a>
              </a>
            </div>
            <div class="col-sm">
              <a href="#" class="tile right-tile">
                <div class="icon">
                  <img src="assets/researchers.png" alt="Researcher" />
                </div>
                <div class="title">Researcher</div>
                <div class="desc">
                  Create a unique project within your scientific discipline.
                  With this feature, you can save and aggregate your favorite
                  services to create a knowledge base from available EOSC
                  resources. Adding the project will help you organize your
                  services a into logical blocks and gain support in the scope
                  of the created idea.
                </div>
                <a
                  href="{{ betaMarketplace }}projects/"
                  class="btn btn-sm-landing btn-secondary"
                >
                  Create a project
                </a>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div id="eosc-navy">
        <div class="container">
          <div class="row">
            <div class="col-md-3 col-sm-12 mb-4">
              <img
                src="assets/eosc-logo-mono.svg"
                alt="EOSC Portal Catalogue and Marketplace"
                class="eosc-logo-navy"
              />
            </div>
            <div class="col-md-9 col-sm-12">
              <h4>
                We are the European Open Science Cloud (EOSC), an environment
                for hosting and processing research data to support EU open
                science
              </h4>
            </div>
          </div>

          <div class="row mt-5">
            <div class="col-md-3 col-sm-12">
              <a href="{{ betaMarketplace }}" class="eosc-info">
                <div class="eosc-info-icon">
                  <img
                    src="assets/browse-marketplace.svg"
                    alt="Browse Marketplace"
                  />
                </div>
                <div class="eosc-info-texts">
                  <div class="eosc-info-title">Browse Marketplace</div>
                  <div class="eosc-info-subtitle">
                    Browse through over 3 million research and innovation tools
                    and services, thousands of datasets from a wide range of
                    research domains from renowned European service providers.
                  </div>
                </div>
              </a>
            </div>
            <div class="col-md-3 col-sm-12">
              <a href="{{ betaMy }} " class="eosc-info">
                <div class="eosc-info-icon">
                  <img src="assets/dashboard.svg" alt="dashboard" />
                </div>
                <div class="eosc-info-texts">
                  <div class="eosc-info-title">My EOSC Dashboard</div>
                  <div class="eosc-info-subtitle">
                    Manage your research projects, access your activity history,
                    and get resource recommendations.
                  </div>
                </div>
              </a>
            </div>
            <div class="col-md-3 col-sm-12">
              <a href="https://eosc-portal.eu/" class="eosc-info">
                <div class="eosc-info-icon">
                  <img src="assets/portal.svg" alt="EOSC Portal" />
                </div>
                <div class="eosc-info-texts">
                  <div class="eosc-info-title">EOSC Portal</div>
                  <div class="eosc-info-subtitle">
                    Stay up to date with news and events. Read use cases or
                    success stories that highlight how EOSC resources can
                    support the daily work of researchers and innovators.
                  </div>
                </div>
              </a>
            </div>
            <div class="col-md-3 col-sm-12">
              <a href="{{ betaProviders }}home" class="eosc-info">
                <div class="eosc-info-icon">
                  <img src="assets/hub.svg" alt="Providers Hub" />
                </div>
                <div class="eosc-info-texts">
                  <div class="eosc-info-title">Providers Hub</div>
                  <div class="eosc-info-subtitle">
                    A single platform for providers to onboard their
                    organization into the EOSC portal, register and manage their
                    resources and gain rich insights about the usage of their
                    offerings.
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div id="up-to-date">
        <div class="container">
          <div class="row">
            <h3>Stay up to date with what is current in your research field</h3>
            <div class="cards-wrapper">
              <a
                href="{{
                  betaServiceAllUrl
                }}&fq=fos:(%2203%20medical%20and%20health%20sciences%22)"
                class="card"
              >
                <img src="assets/ico-molecular.svg" alt="Medical" />
                Medical<br />
                & Health Sciences
              </a>
              <a
                href="{{
                  betaServiceAllUrl
                }}&fq=fos:(%2202%20engineering%20and%20technology%22)"
                class="card"
              >
                <img src="assets/ico-technology.svg" alt="Engineering" />
                Engineering<br />
                & Technology
              </a>
              <a
                href="{{
                  betaServiceAllUrl
                }}&fq=fos:(%2201%20natural%20sciences%22)"
                class="card natural-sciences"
              >
                <img src="assets/ico-microscope.svg" alt="Natural Sciences" />
                Natural Sciences
              </a>
            </div>
            <div class="cards-wrapper">
              <a
                href="{{
                  betaServiceAllUrl
                }}&fq=fos:(%2206%20humanities%20and%20the%20arts%22)"
                class="card"
              >
                <img
                  src="assets/ico-artificial-intelligence.svg"
                  alt="Humanities"
                />
                Humanities
              </a>
              <a
                href="{{
                  betaServiceAllUrl
                }}&fq=fos:(%2204%20agricultural%20and%20veterinary%20sciences%22)"
                class="card"
              >
                <img src="assets/ico-agriculture.svg" alt="Agricultural" />
                Agricultural<br />Sciences
              </a>
              <a
                href="{{
                  betaServiceAllUrl
                }}&fq=fos:(%2205%20social%20sciences%22)"
                class="card"
              >
                <img
                  src="assets/ico-social-science.svg"
                  alt="Social Sciences"
                />
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
  betaServiceAllUrl = `${environment.betaServiceAllUrl}`;
  betaProviders = `${environment.betaProviders}`;
  betaMy = `${environment.betaMy}`;
  betaMarketplace = `${environment.betaMarketplace}`;

  login() {
    window.location.href = `${environment.backendApiPath}/auth/request`;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSearchCustomer(event: any) {
    window.open(`${environment.betaSearch}search/all?q=${event}`);
  }
}
