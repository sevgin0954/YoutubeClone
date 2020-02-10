import { TestBed } from '@angular/core/testing';

import { ArrowButtonService } from './arrow-button.service';

describe('ArrowButtonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArrowButtonService = TestBed.get(ArrowButtonService);
    expect(service).toBeTruthy();
  });
});
