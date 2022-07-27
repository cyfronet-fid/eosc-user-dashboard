import { TestBed } from '@angular/core/testing';

import { LibrarySectionsService } from './library-sections.service';

describe('LibraryWidgetsService', () => {
  let service: LibrarySectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibrarySectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
