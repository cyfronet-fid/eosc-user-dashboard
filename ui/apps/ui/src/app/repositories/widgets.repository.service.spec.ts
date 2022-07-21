import { TestBed } from '@angular/core/testing';
import { WidgetsRepositoryService } from './widgets.repository.service';

describe('Dashboard.RepositoryService', () => {
  let service: WidgetsRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WidgetsRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
