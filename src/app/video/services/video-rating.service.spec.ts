import { TestBed } from '@angular/core/testing';

import { VideoRatingService } from './video-rating.service';

describe('VideoRatingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VideoRatingService = TestBed.get(VideoRatingService);
    expect(service).toBeTruthy();
  });
});
