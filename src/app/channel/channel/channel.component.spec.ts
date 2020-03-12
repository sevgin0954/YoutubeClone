import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelComponent } from './channel.component';
import { Channel } from 'src/app/models/channel/channel';
import { Observable, of } from 'rxjs';
import { Data, ActivatedRoute } from '@angular/router';
import { Component, Input } from '@angular/core';
import { ChannelCreateUtilities } from 'src/tests-common/create-utilities/channel-create-utilities';

describe('ChannelComponent', () => {

  @Component({ selector: 'app-channel-mini', template: '' })
  class ChannelMiniComponent { @Input() channel: Channel; @Input() channelId: string }

  @Component({ selector: 'app-channel-sections', template: '' })
  class ChannelSectionsComponent { @Input() channelId: string }

  const channelBrandingSettings = ChannelCreateUtilities.createBrandingSettings();
  const channel: Channel = ChannelCreateUtilities.createChannel(channelBrandingSettings);
  const routerData: Observable<Data> = of({
    channel: channel
  });

  let routeService: any;
  let fixture: ComponentFixture<ChannelComponent>;
  let component: ChannelComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChannelComponent, ChannelMiniComponent, ChannelSectionsComponent],
      providers: [{ provide: ActivatedRoute, useValue: routeService }]
    });
  });
  beforeEach(() => {
    routeService = {};
    routeService.data = routerData;
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    // Arrange

    // Act

    // Assert
    expect(component).toBeTruthy();
  });

  it('should contain picture tag', () => {
    // Arrange
    const expectedTag = 'picture';
    const nativeElement: HTMLElement = fixture.nativeElement;

    // Act
    fixture.detectChanges();

    // Assert
    expect(nativeElement.getElementsByTagName(expectedTag).length).toBeGreaterThanOrEqual(1);
  });

  it('should initialize channel after ngOnInit is called', () => {
    // Arrange

    // Act
    fixture.detectChanges();

    // Assert
    expect(component.channel).toEqual(channel);
  });
});
