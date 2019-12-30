import { TestBed } from '@angular/core/testing';

import { FormatterService } from './formatter.service';

describe('FormatterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormatterService = TestBed.get(FormatterService);
    expect(service).toBeTruthy();
  });
});
