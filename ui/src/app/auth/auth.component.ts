import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-auth',
  template: ``
})
export class AuthComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe(async (params) => {
      console.log(params)
      switch (params['action']) {
        case "logout":
          await this._authService.logout().toPromise()
          await this._router.navigate([""])
          break
        default:
          await this._router.navigate(['/error'])
      }
    })
  }
}
