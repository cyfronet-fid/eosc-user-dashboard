import { TestBed } from '@angular/core/testing';

import { LoggedInUser } from './logged-in-user.service';

describe('IsLoggedInService', () => {
  let service: LoggedInUser;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedInUser);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
