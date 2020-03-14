import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelSectionsComponent } from './channel-sections.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChannelSection } from 'src/app/models/channel-section/channel-section';
import { of } from 'rxjs';
import { ChannelSectionService } from '../services/channel-section.service';
import { ChannelSectionCreateUtilities } from 'src/tests-common/create-utilities/channel-section-create-utilities';
import { ExceptionConstants } from 'src/app/shared/Constants/exception-constants';
import { ArgumentsUtilities } from 'src/tests-common/utilities/arguments-utilities';

let component: ChannelSectionsComponent;
  let fixture: ComponentFixture<ChannelSectionsComponent>;
  let channelSectionService: any;

  beforeEach(() => {
    channelSectionService = jasmine.createSpyObj('ChannelSectionService', ['getByChannelId']);
  });
  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ChannelSectionsComponent],
      providers: [{ provide: ChannelSectionService, useValue: channelSectionService }],
      schemas: [NO_ERRORS_SCHEMA]
    });
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelSectionsComponent);
    component = fixture.componentInstance;
  });

describe('ChannelSectionsComponent', () => {

  const channelId = 'randomChannelId'
  const channelSections = createChannelSections(channelId);
  const channelSectionData$ = of(channelSections);

  beforeEach(() => {
    channelSectionService.getByChannelId.and.returnValue(channelSectionData$);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('with null channelId input should throw an exception', () => {
    // Arrange
    const channelId = null;
    const exceptionRegex = new RegExp(ExceptionConstants.REQUIRED_INPUT);

    component.channelId = channelId;

    // Act

    // Assert
    expect(() => fixture.detectChanges()).toThrowError(exceptionRegex);
  });

  it('with empty channelId input should throw an exception', () => {
    // Arrange
    const channelId = '';
    const exceptionRegex = new RegExp(ExceptionConstants.EMPTY_STRING);

    component.channelId = channelId;

    // Act

    // Assert
    expect(() => fixture.detectChanges()).toThrowError(exceptionRegex);
  });

  it('should call channelSectionService\'s getByChannelId method with channelId in ngOnChanges', () => {
    // Arrange
    const channelId = 'randomChannelId'
    const getByChannelIdFunc = channelSectionService.getByChannelId;

    // Act
    component.channelId = channelId;
    component.ngOnChanges();

    // Assert
    const calledChannelId = ArgumentsUtilities.getMostRecentArgument(getByChannelIdFunc, 0);
    expect(calledChannelId).toEqual(channelId);
  });

  it('should load channelSections after channelId has been set', () => {
    // Arrange
    component.channelId = channelId;

    // Act
    fixture.detectChanges();

    // Assert
    expect(component.channelSections.length).toEqual(2);
    expect(component.channelSections).toContain(channelSections[0]);
    expect(component.channelSections).toContain(channelSections[1]);
  });

  it('should load channelSections sorted by a position in ascending order', () => {
    // Arrange
    component.channelId = channelId;

    // Act
    fixture.detectChanges();

    // Assert
    expect(component.channelSections[0].snippet.position).toEqual(0);
    expect(component.channelSections[1].snippet.position).toEqual(1);
  });

  function createChannelSections(channelId: string): ChannelSection[] {
    const channelSectionSnippet1 = ChannelSectionCreateUtilities.createSnippet(channelId, 0);
    const channelSection1 = ChannelSectionCreateUtilities.create(channelSectionSnippet1, '123');

    const channelSectionSnippet2 = ChannelSectionCreateUtilities.createSnippet(channelId, 1);
    const channelSection2 = ChannelSectionCreateUtilities.create(channelSectionSnippet2, '456');

    const channelSections: ChannelSection[] = [channelSection2, channelSection1];

    return channelSections;
  }
});

describe('ChannelSectionsComponent\'s getSectionType method', () => {

  it('should return channelSection type', () => {
    // Arrange
    const channelSectionSnippet = ChannelSectionCreateUtilities.createSnippet();
    const channelSection = ChannelSectionCreateUtilities.create(channelSectionSnippet);

    // Act
    const result = component.getSectionType(channelSection);

    // Assert
    expect(result).toEqual(channelSection.snippet.type);
  });
});
