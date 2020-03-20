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
import { PageArguments } from '../shared/arguments/page-arguments';

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

  it('should not allow to load more videos while loading videos during the initialization', () => {
    // Arrange
    const videosSubject = new Subject<ServiceModel<Video[]>>();
    setupServicesWithVideoSubject(videosSubject);

    // Act
    component.ngOnInit();

    window.dispatchEvent(new Event('scroll'));
    window.dispatchEvent(new Event('scroll'));

    // Assert
    expect(videoService.getMostPopular).toHaveBeenCalledTimes(1);
  });

  it('when the bottom of the page is reached should load more videos', () => {
    // Arrange
    const videosSubject = new Subject<ServiceModel<Video[]>>();
    setupServicesWithVideoSubject(videosSubject);

    // Act
    window.dispatchEvent(new Event('scroll'));

    // Assert
    expect(videoService.getMostPopular).toHaveBeenCalledTimes(1);
  });

  it('when the bottom of the page is reached without more videos to load should not try to load videos again', () => {
    //Arrange
    const serviceModel = ServiceModelCreateUtilities.create();
    videoService.getMostPopular.and.returnValue(of(serviceModel));

    // Act
    window.dispatchEvent(new Event('scroll'));
    window.dispatchEvent(new Event('scroll'));

    // Assert
    expect(videoService.getMostPopular).toHaveBeenCalledTimes(1);
  })

  it('when the bottom of the page is reached should be able to load again after it has finished loading', () => {
    //Arrange
    const pageToken = '123';
    const serviceModel = ServiceModelCreateUtilities.create([], pageToken);
    const videosSubject = new Subject<ServiceModel<Video[]>>();
    setupServicesWithVideoSubject(videosSubject);

    // Act
    // Start the first loading
    window.dispatchEvent(new Event('scroll'));

    // End loading the first loading
    videosSubject.next(serviceModel);

    // Start the next loading
    window.dispatchEvent(new Event('scroll'));

    // Assert
    expect(videoService.getMostPopular).toHaveBeenCalledTimes(2);
  });

  it('when the bottom of the page is reached should call videoService.getMostPopular with currect region code', () => {
    // Arrange
    const expectedRegionCode = RegionCode.BG;
    geolacationService.getRegionCode.and.returnValue(of(expectedRegionCode));

    const serviceModel = ServiceModelCreateUtilities.create([], '123');
    videoService.getMostPopular.and.returnValue(of(serviceModel));

    // Act
    fixture.detectChanges();
    window.dispatchEvent(new Event('scroll'));

    // Assert
    const regionCodeArgument =
      ArgumentsUtilities.getMostRecentArgument(videoService.getMostPopular, 0);
    expect(regionCodeArgument).toEqual(expectedRegionCode);
    expect(videoService.getMostPopular).toHaveBeenCalledTimes(2);
  });

  it('when the bottom of the page is reached should add the newly loaded videos to the videos collection', () => {
    // Arrange
    const videos = [VideoCreateUtilities.create()];
    const nextPageToken = '123';
    const serviceModel = ServiceModelCreateUtilities.create(videos, nextPageToken);
    videoService.getMostPopular.and.returnValue(of(serviceModel));

    const expectedVideos = videos.concat(videos);

    // Act
    window.dispatchEvent(new Event('scroll'));
    window.dispatchEvent(new Event('scroll'));

    // Assert
    expect(component.videos).toEqual(expectedVideos);
  });

  it('should not allow to load more videos while loading videos when bottom is reached', () => {
    //Arrange
    const serviceModel = ServiceModelCreateUtilities.create([], '123');

    const videosSubject = new Subject<ServiceModel<Video[]>>();
    setupServicesWithVideoSubject(videosSubject);

    // Act
    fixture.detectChanges();

    // Start first loading
    window.dispatchEvent(new Event('scroll'));

    // Should ignore
    window.dispatchEvent(new Event('scroll'));

    // Finish first loading
    videosSubject.next(serviceModel);

    // Start second loading
    window.dispatchEvent(new Event('scroll'));

    // Assert
    expect(videoService.getMostPopular).toHaveBeenCalledTimes(2);
  });

  it('when loading more videos should call videoService.getMostPopular with correct resources', () => {
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

  it('while loading more videos should call videoService.getMostPopular with the page token from the result from the previous responce from videoService.getMostPopular', () => {
    // Arrange
    const nextPageToken = '123';
    const serviceModel = ServiceModelCreateUtilities.create([], nextPageToken);
    videoService.getMostPopular.and.returnValue(of(serviceModel));

    // Act
    window.dispatchEvent(new Event('scroll'));
    window.dispatchEvent(new Event('scroll'));

    // Assert
    const calledPageArgsArgument: PageArguments =
      ArgumentsUtilities.getMostRecentArgument(videoService.getMostPopular, 1);
    expect(calledPageArgsArgument.pageToken).toEqual(nextPageToken);
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
  const APP_LOADING_SELECTOR = 'app-loading';

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

  it('with areMoreVideos equal to false show not show loading', () => {
    // Arrange
    component.areMoreVideos = false;

    setupVideoServiceWithVideos();

    // Act
    fixture.detectChanges();

    // Assert
    const rootElement: HTMLElement = fixture.nativeElement.innerHTML;
    expect(rootElement).not.toContain(APP_LOADING_SELECTOR);
  });

  it('with areMoreVideos equal to true should show loading', () => {
    // Arrange
    component.areMoreVideos = true;

    setupVideoServiceWithVideos();

    // Act
    fixture.detectChanges();

    // Assert
    const rootElement: HTMLElement = fixture.nativeElement.innerHTML;
    expect(rootElement).toContain(APP_LOADING_SELECTOR);
  });

  function setupVideoServiceWithVideos(): void {
    const videosSnippet = VideoCreateUtilities.createSnippet();
    videosSnippet.description = 'abc';
    const videos = [
      VideoCreateUtilities.create('', videosSnippet),
      VideoCreateUtilities.create('', videosSnippet)
    ];
    setupServicesWithVideos(videos);
  }
})

function setupServicesWithVideos(videos: Video[]): void {
  const regionCode = RegionCode.BG;
  geolacationService.getRegionCode.and.returnValue(of(regionCode));

  const serviceModel = ServiceModelCreateUtilities.create(videos);
  const serviceModel$ = of(serviceModel);
  videoService.getMostPopular.and.returnValue(serviceModel$);
}
