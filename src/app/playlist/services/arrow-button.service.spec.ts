import { TestBed } from '@angular/core/testing';

import { ArrowDisplayButtonService } from './arrow-display-button.service';

describe('ArrowButtonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArrowDisplayButtonService = TestBed.get(ArrowDisplayButtonService);
    expect(service).toBeTruthy();
  });
});
