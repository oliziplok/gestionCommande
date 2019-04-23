import { TestBed } from '@angular/core/testing';

import { ErrorPrompService } from './error-promp.service';

describe('ErrorPrompService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorPrompService = TestBed.get(ErrorPrompService);
    expect(service).toBeTruthy();
  });
});
