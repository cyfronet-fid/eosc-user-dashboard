import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserProfileService } from '../../auth/user-profile.service';
import { environment } from '@environment/environment';
import { delay } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'ui-widget-impact',
  template: ` <div></div> `,
  encapsulation: ViewEncapsulation.None,
})
export class WidgetImpactComponent implements OnInit {
  backendUrl = `${environment.backendApiPath}`;

  constructor(private _userProfileService: UserProfileService) {}

  ngOnInit() {
    this._userProfileService.user$
      .pipe(
        untilDestroyed(this),
        // delay is required to have rerender out of angular's detection cycle
        delay(0)
      )
      .subscribe((profile) => console.log(profile));
  }
}
