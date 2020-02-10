import { TestBed } from '@angular/core/testing';

import { ElementsPredicateService } from './elements-predicate.service';

describe('ElementsPredicateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ElementsPredicateService = TestBed.get(ElementsPredicateService);
    expect(service).toBeTruthy();
  });
});
