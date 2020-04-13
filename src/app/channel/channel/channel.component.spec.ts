import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Data, ActivatedRoute } from '@angular/router';

import { ChannelComponent } from './channel.component';
import { Channel } from 'src/app/models/channel/channel';
import { Observable, of } from 'rxjs';
import { ChannelCreateUtilities } from 'src/tests-common/create-utilities/channel-create-utilities';
import { ChannelThumbnails } from 'src/app/models/channel/channel-thumbnails';
import { Thumbnail } from 'src/app/models/thumbnail/thumbnail';

describe('', () => {
  const channelBrandingSettings = ChannelCreateUtilities.createBrandingSettings();

  const thumbnail: Thumbnail = {
    height: 1,
    url: '',
    width: 1
  };
  const channelThumbnails: ChannelThumbnails = {
    default: thumbnail,
    high: thumbnail,
    medium: thumbnail
  };

  const channelSnippet = ChannelCreateUtilities.createSnippet(undefined, channelThumbnails);

  const channel: Channel = ChannelCreateUtilities
    .create(channelBrandingSettings, channelSnippet);
  const routerData: Observable<Data> = of({
    channel: channel
  });

  let routeService: any;
  let fixture: ComponentFixture<ChannelComponent>;
  let component: ChannelComponent;

  beforeEach(() => {
    routeService = {};
    routeService.data = routerData;
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChannelComponent],
      providers: [{ provide: ActivatedRoute, useValue: routeService }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelComponent);
    component = fixture.componentInstance;
  });

  describe('ChannelComponent', () => {

    it('should be created', () => {
      // Arrange

      // Act

      // Assert
      expect(component).toBeTruthy();
    });

    it('should initialize channel after initialization is called', () => {
      // Arrange

      // Act
      fixture.detectChanges();

      // Assert
      expect(component.channel).toEqual(channel);
    });
  });
})
