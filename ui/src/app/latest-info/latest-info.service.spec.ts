import { TestBed } from '@angular/core/testing';

import { LatestInfoService } from './latest-info.service';

describe('LatestInfoService', () => {
  let service: LatestInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LatestInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
