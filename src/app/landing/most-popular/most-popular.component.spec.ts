import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostPopularComponent } from './most-popular.component';
import { GeolocationService } from '../../services-singleton/geolocation.service';
import { WindowService } from '../../services-singleton/window.service';
import { VideoService } from '../../services-singleton/video.service';
import { RegionCode } from '../../shared/enums/region-code';
import { ArgumentsUtilities } from 'src/tests-common/utilities/arguments-utilities';
import { of } from 'rxjs';
import { Video } from '../../models/video/video';
import { ServiceModelCreateUtilities } from 'src/tests-common/create-utilities/service-model-create-utilities';
import { VideoCreateUtilities } from 'src/tests-common/create-utilities/video-create-utilities';

describe('', () => {
  let geolacationService: any;
  let videoService: any;
  let windowService: any;

  let component: MostPopularComponent;
  let fixture: ComponentFixture<MostPopularComponent>;

  beforeEach(() => {
    geolacationService = jasmine.createSpyObj('GeolocationService', ['getRegionCode']);
    videoService = jasmine.createSpyObj('VideoService', ['getMostPopular']);
    windowService = jasmine.createSpyObj('WindowService', ['onReachBottom']);
  });
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostPopularComponent],
      providers: [
        { provide: GeolocationService, useValue: geolacationService },
        { provide: VideoService, useValue: videoService },
        { provide: WindowService, useValue: windowService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(MostPopularComponent);
    component = fixture.componentInstance;
  });

  describe('MostPopularComponent', () => {

    beforeEach(() => {
      windowService.onReachBottom.and.callFake(callback => {
        callback();
      });
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('MostPopularComponent\'s template', () => {

    const APP_VIDEOS = 'app-videos';

    it('should display videos', () => {
      // Arrange
      setupVideoServiceWithVideos();

      // Act
      fixture.detectChanges();

      // Assert
      const rootElement: HTMLElement = fixture.nativeElement.innerHTML;
      expect(rootElement).toContain(APP_VIDEOS);
    });

    function setupVideoServiceWithVideos(): void {
      const videosSnippet = VideoCreateUtilities.createSnippet();
      videosSnippet.description = 'abc';
      const videos = [
        VideoCreateUtilities.create('', videosSnippet),
        VideoCreateUtilities.create('', videosSnippet)
      ];
      setupServicesWithVideos(videos, '123');
    }
  })

  function setupServicesWithVideos(videos: Video[], nextPageToken?: string): void {
    const regionCode = RegionCode.BG;
    geolacationService.getRegionCode.and.returnValue(of(regionCode));

    const serviceModel = ServiceModelCreateUtilities.create(videos, nextPageToken);
    const serviceModel$ = of(serviceModel);
    videoService.getMostPopular.and.returnValue(serviceModel$);
  }
});
