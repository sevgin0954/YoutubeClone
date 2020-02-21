import { TestBed } from '@angular/core/testing';

import { ThumbnailsService } from './thumbnails.service';

describe('ThumbnailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThumbnailsService = TestBed.get(ThumbnailsService);
    expect(service).toBeTruthy();
  });
});
