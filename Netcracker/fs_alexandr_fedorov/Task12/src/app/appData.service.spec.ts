import { TestBed } from '@angular/core/testing';

import { AppDataService } from './appData.service';

describe('DataService', () => {
  let service: AppDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
