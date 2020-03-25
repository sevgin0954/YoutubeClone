import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostPopularComponent } from './most-popular.component';
import { GeolocationService } from '../services-singleton/geolocation.service';
import { WindowService } from '../services-singleton/window.service';
import { VideoService } from '../services-singleton/video.service';
import { RegionCode } from '../shared/enums/region-code';
import { ArgumentsUtilities } from 'src/tests-common/utilities/arguments-utilities';
import { of, Subject } from 'rxjs';
import { Video } from '../models/video/video';
import { ServiceModel } from '../models/service-models/service-model';
import { ServiceModelCreateUtilities } from 'src/tests-common/create-utilities/service-model-create-utilities';
import { VideoCreateUtilities } from 'src/tests-common/create-utilities/video-create-utilities';
import { VideoResource } from '../shared/enums/resource-properties/video-resource';
import { ExceptionConstants } from '../shared/Constants/exception-constants';
import { PageArguments } from '../shared/arguments/page-arguments';

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

    it('during initialization should start to load videos with region code after it has loaded the current region code', () => {
      // Arrange
      const regionCode = RegionCode.BG;
      geolacationService.getRegionCode.and.returnValue(of(regionCode));

      // Act
      component.ngOnInit();

      // Assert
      const videoServiceArgument =
        ArgumentsUtilities.getMostRecentArgument(videoService.getMostPopular, 0);
      expect(videoServiceArgument).toEqual(regionCode);
      expect(videoService.getMostPopular).toHaveBeenCalledTimes(1);
    });
  });

  describe('MostPopularComponent\'s loadMoreVideos', () => {

    it('when called before the previous loading has finished should throw an exception', () => {
      // Arrange
      const videosSubject = new Subject<ServiceModel<Video[]>>();
      setupServicesWithVideoSubject(videosSubject);

      const exceptionRegex = new RegExp(ExceptionConstants.CURRENTLY_LOADING);

      // Act
      component.loadMoreVideos();

      // Assert
      expect(() => component.loadMoreVideos()).toThrowError(exceptionRegex);
    });

    it('without more videos to load should throw an exception', () => {
      // Arrange
      const serviceModel = ServiceModelCreateUtilities.create([]);
      const videosSubject = new Subject<ServiceModel<Video[]>>();
      setupServicesWithVideoSubject(videosSubject);

      const exceptionRegex = new RegExp(ExceptionConstants.NO_MORE_ELEMENTS_TO_LOAD);

      // Act
      component.loadMoreVideos();
      videosSubject.next(serviceModel);

      // Assert
      expect(() => component.loadMoreVideos()).toThrowError(exceptionRegex);
    });

    it('should load more videos', () => {
      // Arrange
      const videos = [
        VideoCreateUtilities.create()
      ];
      setupServicesWithVideos(videos);

      // Act
      component.loadMoreVideos();

      // Assert
      expect(component.videos).toEqual(videos);
    });

    it('when called should change isCurrentlyLoading to true', () => {
      // Arrange
      const subject = new Subject<ServiceModel<Video[]>>();
      setupServicesWithVideoSubject(subject);

      // Act
      component.loadMoreVideos();

      // Assert
      expect(component.isCurrentlyLoading).toBeTruthy();
    });

    it('when called and finish loading should change isCurrentlyLoading to back to false', () => {
      // Arrange
      const serviceModel = ServiceModelCreateUtilities.create<Video>();
      const subject = new Subject<ServiceModel<Video[]>>();
      setupServicesWithVideoSubject(subject);

      // Act
      component.loadMoreVideos();
      subject.next(serviceModel);

      // Assert
      expect(component.isCurrentlyLoading).toBeFalsy();
    });

    it('without more videos to load should change areMoreVideos to false', () => {
      // Arrange
      const nextPageToken = undefined;
      setupServicesWithVideos([], nextPageToken);

      // Act
      component.loadMoreVideos();

      // Assert
      expect(component.areMoreVideos).toBeFalsy();
    });

    it('should call videoService.getMostPopular with the pageToken from the responce from the previous call', () => {
      // Arrange
      const nextPageToken = '123';
      setupServicesWithVideos([], nextPageToken);

      // Act
      component.loadMoreVideos();
      component.loadMoreVideos();

      // Assert
      const pageArgsArgument: PageArguments =
        ArgumentsUtilities.getMostRecentArgument(videoService.getMostPopular, 1);
      expect(pageArgsArgument.pageToken).toEqual(nextPageToken);
    });

    it('should call videoService.getMostPopular with correct resources', () => {
      // Arrange
      const expectedResources = [
        VideoResource.snippet,
        VideoResource.contentDetails,
        VideoResource.status,
        VideoResource.statistics,
        VideoResource.player
      ];

      setupServicesWithDefaultReturns();

      // Act
      fixture.detectChanges();

      // Assert
      const calledResurceArgument =
        ArgumentsUtilities.getMostRecentArgument(videoService.getMostPopular, 2);
      expect(calledResurceArgument).toEqual(expectedResources);
    });

    function setupServicesWithDefaultReturns(): void {
      const videosSubject = new Subject<ServiceModel<Video[]>>();
      setupServicesWithVideoSubject(videosSubject);
    }

    function setupServicesWithVideoSubject(videosSubject: Subject<ServiceModel<Video[]>>): void {
      const regionCode = RegionCode.BG;
      geolacationService.getRegionCode.and.returnValue(of(regionCode));

      videoService.getMostPopular.and.returnValue(videosSubject);
    }
  });

  describe('MostPopularComponent\'s template', () => {

    const APP_VIDEO_THUMBNAIL_SELECTOR = 'app-video-thumbnail';
    const APP_VIDEO_INFO_SELECTOR = 'app-video-info';
    const APP_TEXT_REVEAL_SELECTOR = 'app-text-reveal';
    const APP_LOADING_ITEMS_SELECTOR = 'app-loading-elements';

    it('should show thumbnail for each video', () => {
      // Arrange
      setupVideoServiceWithVideos();

      // Act
      fixture.detectChanges();

      // Assert
      const rootElement: HTMLElement = fixture.nativeElement.innerHTML;
      expect(rootElement).toContain(APP_VIDEO_THUMBNAIL_SELECTOR);
    });

    it('should show video info for each video', () => {
      // Arrange
      setupVideoServiceWithVideos();

      // Act
      fixture.detectChanges();

      // Assert
      const rootElement: HTMLElement = fixture.nativeElement.innerHTML;
      expect(rootElement).toContain(APP_VIDEO_INFO_SELECTOR);
    });

    it('should show video description for each video', () => {
      // Arrange
      setupVideoServiceWithVideos();

      // Act
      fixture.detectChanges();

      // Assert
      const rootElement: HTMLElement = fixture.nativeElement.innerHTML;
      expect(rootElement).toContain(APP_TEXT_REVEAL_SELECTOR);
    });

    it('without more videos show not show loading', () => {
      // Arrange
      setupVideoServiceWithoutVideos();

      // Act
      fixture.detectChanges();

      // Assert
      const rootElement: HTMLElement = fixture.nativeElement.innerHTML;
      expect(rootElement).not.toContain(APP_LOADING_ITEMS_SELECTOR);
    });

    it('with more videos should show loading', () => {
      // Arrange
      setupVideoServiceWithVideos();

      // Act
      fixture.detectChanges();

      // Assert
      const templateHtml: HTMLElement = fixture.nativeElement.innerHTML;
      expect(templateHtml).toContain(APP_LOADING_ITEMS_SELECTOR);
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

    function setupVideoServiceWithoutVideos(): void {
      const videos = [];
      setupServicesWithVideos(videos);
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
