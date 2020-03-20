import { ChannelSectionService } from "./channel-section.service";
import { ExceptionConstants } from 'src/app/shared/Constants/exception-constants';
import { ChannelSection } from 'src/app/models/channel-section/channel-section';
import { Observable, of } from 'rxjs';
import { ChannelSectionResource } from 'src/app/shared/enums/resource-properties/channel-section-resource';
import { ArgumentsUtilities } from 'src/tests-common/utilities/arguments-utilities';
import { ChannelSectionCreateUtilities } from 'src/tests-common/create-utilities/channel-section-create-utilities';
import { MainConstants } from 'src/app/shared/Constants/main-constants';

let service: ChannelSectionService;
let httpClient: any;

beforeEach(() => {
  httpClient = jasmine.createSpyObj('HttpClient', ['get']);
});
beforeEach(() => {
  service = new ChannelSectionService(httpClient);
});

describe('ChannelSectionService', () => {

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('ChannelSectionService\'s getByChannelId method', () => {

  const returnedItem1 = ChannelSectionCreateUtilities.create();
  const returnedData = {
    items: [returnedItem1]
  }
  const returnedData$ = of(returnedData);

  beforeEach(() => {
    httpClient.get.and.returnValue(returnedData$);
  });

  it('with null channelId should throw an exception', () => {
    // Arrange
    const channelId = null;
    const exceptionRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);

    // Act

    // Assert
    expect(() => callMethodWithChannelId(channelId)).toThrowError(exceptionRegex);
  });

  it('with undefined channelId should throw an exception', () => {
    // Arrange
    const channelId = undefined;
    const exceptionRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);

    // Act

    // Assert
    expect(() => callMethodWithChannelId(channelId)).toThrowError(exceptionRegex);
  });

  it('with null resources should throw an exception', () => {
    // Arrange
    const resources = null;
    const exceptionRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);

    // Act

    // Assert
    expect(() => callMethodWithResources(resources)).toThrowError(exceptionRegex);
  });

  it('with empty resources should throw an exception', () => {
    // Arrange
    const resources = [];
    const exceptionRegex = new RegExp(ExceptionConstants.EMPTY_COLLECTION);

    // Act

    // Assert
    expect(() => callMethodWithResources(resources)).toThrowError(exceptionRegex);
  });

  it('with channelId should call httpClient with query params with channelId', () => {
    // Arrange
    const channelId = '123';
    const channelIdQuery = `channelId=${channelId}`;

    // Act
    callMethodWithChannelId(channelId);

    // Assert
    const urlArgument = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 0);
    expect(urlArgument).toContain(channelIdQuery);
  });

  it('with resources should call httpClient with query params with part equal to the resources separated by commas', () => {
    // Arrange
    const resources1 = ChannelSectionResource.id;
    const resources2 = ChannelSectionResource.contentDetails;
    const resources = [resources1, resources2];

    const resource1Name = ChannelSectionResource[resources1];
    const resource2Name = ChannelSectionResource[resources2];
    const resourcesQuery = `part=${resource1Name},${resource2Name}`;

    // Act
    callMethodWithResources(resources);

    // Assert
    const urlArgument = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 0);
    expect(urlArgument).toContain(resourcesQuery);
  });

  it('should call httpClient with correct path', () => {
    // Arrange
    const expectedPath = MainConstants.YOUTUBE_BASE_URL + '/' + 'channelSections';

    // Act
    callMethodWithDefaultArguments();

    // Assert
    const urlArgument: string = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 0);
    expect(urlArgument.startsWith(expectedPath)).toBeTruthy();
  });

  it('should return channel sections', (done) => {
    // Arrange
    const resources1 = ChannelSectionResource.id;
    const expectedReturnedData = [returnedItem1];

    // Act
    const data$ = callMethodWithResources([resources1]);

    // Assert
    data$.subscribe(data => {
      expect(data).toEqual(expectedReturnedData);
      done();
    });
  });

  function callMethodWithDefaultArguments(): Observable<ChannelSection[]> {
    const channelId = '123';
    const data$ = callMethodWithChannelId(channelId);

    return data$;
  }

  function callMethodWithChannelId(channelId: string): Observable<ChannelSection[]> {
    const resources = [
      ChannelSectionResource.id
    ];
    const data$ = service.getByChannelId(channelId, resources);

    return data$;
  }

  function callMethodWithResources(
    resources: ChannelSectionResource[]
  ): Observable<ChannelSection[]> {
    var channelId = '123';
    const data$ = service.getByChannelId(channelId, resources);

    return data$;
  }
});
