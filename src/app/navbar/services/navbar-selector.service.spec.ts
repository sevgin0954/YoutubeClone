import { TestBed } from '@angular/core/testing';

import { NavbarSelectorService } from './navbar-selector.service';

describe('NavbarSelectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavbarSelectorService = TestBed.get(NavbarSelectorService);
    expect(service).toBeTruthy();
  });
});
