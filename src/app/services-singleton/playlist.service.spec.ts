import { TestBed } from '@angular/core/testing';

import { PlaylistItemsService } from './playlist-items.service';

describe('PlaylistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlaylistItemsService = TestBed.get(PlaylistItemsService);
    expect(service).toBeTruthy();
  });
});
