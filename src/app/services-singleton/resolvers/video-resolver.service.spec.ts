import { TestBed } from '@angular/core/testing';

import { VideoResolverService } from './video-resolver.service';

describe('VideoResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VideoResolverService = TestBed.get(VideoResolverService);
    expect(service).toBeTruthy();
  });
});
