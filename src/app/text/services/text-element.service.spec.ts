import { TestBed } from '@angular/core/testing';

import { TextElementService } from './text-element.service';

describe('TextElementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TextElementService = TestBed.get(TextElementService);
    expect(service).toBeTruthy();
  });
});
