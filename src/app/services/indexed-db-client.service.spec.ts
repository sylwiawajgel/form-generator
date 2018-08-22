import { TestBed, inject } from '@angular/core/testing';

import { IndexedDBClientService } from './indexed-db-client.service';

describe('IndexedDBClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IndexedDBClientService]
    });
  });

  it('should be created', inject([IndexedDBClientService], (service: IndexedDBClientService) => {
    expect(service).toBeTruthy();
  }));
});
