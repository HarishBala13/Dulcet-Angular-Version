import { TestBed } from '@angular/core/testing';

import { LoggerfileService } from './loggerfile.service';

describe('LoggerfileService', () => {
  let service: LoggerfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
