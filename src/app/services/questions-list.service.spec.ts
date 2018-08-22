import { TestBed, inject } from '@angular/core/testing';

import { QuestionsListService } from './questions-list.service';

describe('QuestionsListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionsListService]
    });
  });

  it('should be created', inject([QuestionsListService], (service: QuestionsListService) => {
    expect(service).toBeTruthy();
  }));
});
