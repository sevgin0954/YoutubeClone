import { TestBed } from '@angular/core/testing';

import { PlaylistElementService } from './playlist-element.service';

describe('PlaylistElementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlaylistElementService = TestBed.get(PlaylistElementService);
    expect(service).toBeTruthy();
  });
});
