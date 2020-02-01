import { TestBed } from '@angular/core/testing';

import { ChannelSectionService } from './channel-section.service';

describe('ChannelSectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChannelSectionService = TestBed.get(ChannelSectionService);
    expect(service).toBeTruthy();
  });
});
