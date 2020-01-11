import { TestBed } from '@angular/core/testing';

import { HttpConfigService } from './http-config.service';

describe('HttpConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpConfigService = TestBed.get(HttpConfigService);
    expect(service).toBeTruthy();
  });
});
