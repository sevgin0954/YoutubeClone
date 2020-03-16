import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Data, ActivatedRoute } from '@angular/router';

import { ChannelComponent } from './channel.component';
import { Channel } from 'src/app/models/channel/channel';
import { Observable, of } from 'rxjs';
import { ChannelCreateUtilities } from 'src/tests-common/create-utilities/channel-create-utilities';

const channelBrandingSettings = ChannelCreateUtilities.createBrandingSettings();
const channel: Channel = ChannelCreateUtilities.create(channelBrandingSettings);
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
beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [ChannelComponent],
    providers: [{ provide: ActivatedRoute, useValue: routeService }],
    schemas: [NO_ERRORS_SCHEMA]
  });
});
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

describe('ChannelComponent\'s template', () => {

  it('should contain picture tag', () => {
    // Arrange
    const expectedTag = 'picture';
    const nativeElement: HTMLElement = fixture.nativeElement;

    // Act
    fixture.detectChanges();

    // Assert
    expect(nativeElement.getElementsByTagName(expectedTag).length).toBeGreaterThanOrEqual(1);
  });
});
