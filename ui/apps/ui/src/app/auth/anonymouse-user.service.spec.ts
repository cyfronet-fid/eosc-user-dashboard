import { TestBed } from '@angular/core/testing';

import { AnonymousUser } from './anonymous-user.service';

describe('AnonymouseUserService', () => {
  let service: AnonymousUser;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnonymousUser);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
