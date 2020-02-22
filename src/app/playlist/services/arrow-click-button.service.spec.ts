import { TestBed } from '@angular/core/testing';

import { ArrowClickButtonService } from './arrow-click-button.service';

describe('ArrowClickButtonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArrowClickButtonService = TestBed.get(ArrowClickButtonService);
    expect(service).toBeTruthy();
  });
});
