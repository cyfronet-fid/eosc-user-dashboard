import { TestBed } from '@angular/core/testing';
import { LibraryWidgetsRepositoryService } from './library-widgets.repository.service';

describe('Library.RepositoryService', () => {
  let service: LibraryWidgetsRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibraryWidgetsRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
