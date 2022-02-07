import {
  Component,
  ElementRef,
  OnInit, Renderer2,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import {environment} from "../environments/environment";
import {AuthService} from "./auth/auth.service";


@Component({
  selector: 'app-main-header',
  template: `
    <div
      id="eosc-common-main-header"
      [attr.data-login-url]="backendUrl + '/auth/request'"
      [attr.data-logout-url]="backendUrl + '/auth/logout'"
      #eoscCommonMainHeader
    ></div>
  `,
  encapsulation: ViewEncapsulation.None
})
export class MainHeaderComponent implements OnInit {
  backendUrl = `${environment.backendUrl}/${environment.webApiPath}`

  @ViewChild("eoscCommonMainHeader", {static: false}) containerRef: ElementRef | undefined;

  constructor(private _authService: AuthService , private _renderer: Renderer2) {}

  ngOnInit() {
    this._authService.getUserInfo$()
      .toPromise()
      .then((response: any) => {
        const { username } = response
        this._renderer.setAttribute(this.containerRef?.nativeElement, "username", username);
        (window as any).renderCustomComponent(
          (window as any).EoscCommonMainHeader,
          { id: "eosc-common-main-header" }
        )
      })
      .catch(error => {
        this._renderer.setAttribute(this.containerRef?.nativeElement, "username", "");
        (window as any).renderCustomComponent(
          (window as any).EoscCommonMainHeader,
          { id: "eosc-common-main-header" }
        )
      })
  }
}
