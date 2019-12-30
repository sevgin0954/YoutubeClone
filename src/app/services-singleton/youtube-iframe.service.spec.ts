import { TestBed } from '@angular/core/testing';

import { YoutubeIframeService } from './youtube-iframe.service';

describe('YoutubeIframeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YoutubeIframeService = TestBed.get(YoutubeIframeService);
    expect(service).toBeTruthy();
  });
});
