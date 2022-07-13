import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'ui-landing-page',
  template: `
    <main>
      <div id="container">
        <div class="row">
          <div class="col">
            <div id="info">
              <h3>Welcome in</h3>
              <h1>EOSC User Dashboard</h1>
              <p id="description">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <button id="primary-btn" (click)="login()">Login</button>
            </div>
          </div>
          <div class="col">
            <img
              id="info-graphic"
              src="assets/landing-page.png"
              alt="EOSC User Dashboard"
            />
          </div>
        </div>
      </div>
    </main>
  `,
  styles: [
    `
      #container {
        max-width: 1180px;
        margin: 0 auto;
        text-align: left;
        position: relative;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
      }
      #description {
        padding-bottom: 54px;
      }
      #info-graphic {
        max-width: calc(100% + 150px);
        margin-left: -33px;
        margin-top: -70px;
      }
      h1 {
        font-size: 64px;
        padding-bottom: 56px;
      }
      h3 {
        font-size: 32px;
        padding-bottom: 8px;
      }
      main {
        height: calc(100vh - 36px);
        background-image: url('/assets/background-layer.png'),
          url('/assets/background.png');
        background-position: center top, center top;
        background-repeat: no-repeat, no-repeat;
        background-size: 1560px, 1920px;
      }
      #primary-btn {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        padding: 10px 50px;

        background: linear-gradient(90deg, #3987be 0%, #0c2bd5 100%);
        border-radius: 50px;
        border: none;
        color: white;
      }
    `,
  ],
})
export class LandingPageComponent {
  constructor(private _authService: AuthService) {}
  login = () => this._authService.login();
}
