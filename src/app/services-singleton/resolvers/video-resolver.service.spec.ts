import { VideoResolverService } from './video-resolver.service';

describe('', () => {
  let service: VideoResolverService;
  let videoService: any;

  beforeEach(() => {
    videoService = jasmine.createSpyObj('VideoService', ['getByIds']);
  });
  beforeEach(() => {
    service = new VideoResolverService(videoService);
  });

  describe('VideoResolverService', () => {

    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });
});
