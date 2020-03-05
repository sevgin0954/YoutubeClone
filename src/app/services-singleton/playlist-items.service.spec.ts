import { PlaylistItemsService } from "./playlist-items.service";
import { ExceptionConstants } from '../shared/Constants/exception-constants';
import { ServiceModel } from '../models/service-models/service-model';
import { PlaylistItem } from '../models/playlist/playlist-item';
import { Observable, of } from 'rxjs';
import { PageArguments } from '../shared/arguments/page-arguments';
import { PlaylistItemResourceProperties } from '../shared/enums/resource-properties/playlist-item-resource-properties';
import { HttpClientUtilities } from 'src/tests-common/utilities/htpp-client-utilities';
import { MainConstants } from '../shared/Constants/main-constants';

let httpClient: any;
let service: any;

beforeEach(() => {
  httpClient = jasmine.createSpyObj('HttpClient', ['get']);
});
beforeEach(() => {
  service = new PlaylistItemsService(httpClient);
});

describe('PlaylistItemsService', () => {

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('PlaylistItemsService\s getById method', () => {

  it('with null playlistId should throw an exception', () => {
    // Arrange
    const playlistId = null;
    const exceptionRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);

    // Act

    // Assert
    expect(() => callMethodWithPlaylistId(playlistId)).toThrowError(exceptionRegex);
  });

  it('with empty string playlistId should throw an exception', () => {
    // Arrange
    const playlistId = '';
    const exceptionRegex = new RegExp(ExceptionConstants.EMPTY_STRING);

    // Act

    // Assert
    expect(() => callMethodWithPlaylistId(playlistId)).toThrowError(exceptionRegex);
  });

  it('with null pageArgs should throw an exception', () => {
    // Arrange
    const pageArgs = null;
    const exceptionRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);

    // Act

    // Assert
    expect(() => callMethodWithPageArgs(pageArgs)).toThrowError(exceptionRegex);
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

  it('with playlistId should call httpClient with query params with playlistId', () => {
    // Arrange
    const playlistId = '123';
    const playlistIdQuery = `playlistId=${playlistId}`;

    // Act
    callMethodWithPlaylistId(playlistId);

    // Assert
    const urlArgument = HttpClientUtilities.getHttpClientUrlArgument(httpClient.get);
    expect(urlArgument).toContain(playlistIdQuery);
  });

  it('with pageArgs with maxResults should call httpClient with query params with maxResults', () => {
    // Arrange
    const maxResults = 1;
    const pageArgs = new PageArguments(maxResults, null);
    const maxResultsQuery = `maxResults=${maxResults}`;

    // Act
    callMethodWithPageArgs(pageArgs);

    // Assert
    const urlArgument = HttpClientUtilities.getHttpClientUrlArgument(httpClient.get);
    expect(urlArgument).toContain(maxResultsQuery);
  });

  it('with pageArgs without pageToken should call httpClient with query params without pageToken', () => {
    // Arrange
    const pageArgs = new PageArguments(1, null);
    const maxResultsQueryKey = 'maxResults';

    // Act
    callMethodWithPageArgs(pageArgs);

    // Assert
    const urlArgument = HttpClientUtilities.getHttpClientUrlArgument(httpClient.get);
    expect(urlArgument).toContain(maxResultsQueryKey);
  });

  it('with pageArgs with pageToken should call httpClient with query params with pageToken', () => {
    // Arrange
    const pageToken = '123';
    const pageArgs = new PageArguments(1, pageToken);
    const pageTokenQuery = `pageToken`;

    // Act
    callMethodWithPageArgs(pageArgs);

    // Assert
    const urlArgument = HttpClientUtilities.getHttpClientUrlArgument(httpClient.get);
    expect(urlArgument).toContain(pageTokenQuery);
  });

  it('with resources should add call httpClient with query params with resources separated by comma', () => {
    // Arrange
    const resource1 = PlaylistItemResourceProperties.id;
    const resource2 = PlaylistItemResourceProperties.snippet;
    const resources = [resource1, resource2];

    const resource1Name = PlaylistItemResourceProperties[resource1];
    const resource2Name = PlaylistItemResourceProperties[resource2];
    const partQuery = `part=${resource1Name},${resource2Name}`;

    // Act
    callMethodWithResources(resources);

    // Assert
    const urlArgument = HttpClientUtilities.getHttpClientUrlArgument(httpClient.get);
    expect(urlArgument).toContain(partQuery);
  });

  it('should call httpClient with correct path', () => {
    // Arrange
    const basePath = MainConstants.BASE_URL + '/' + 'playlistItems';

    // Act
    callMethodWithDefaultArgument();

    // Assert
    const urlArgument = HttpClientUtilities.getHttpClientUrlArgument(httpClient.get);
    expect(urlArgument).toContain(basePath);
  });

  it('should return the returned data from the httpClient', () => {
    // Arrange
    const expectedData = of('123');
    httpClient.get.and.returnValue(expectedData);

    // Act
    const actualData$ = callMethodWithDefaultArgument();

    // Assert
    expect(actualData$).toEqual(actualData$);
  });

  function callMethodWithDefaultArgument(): Observable<ServiceModel<PlaylistItem[]>> {
    const playlistId = '123';
    const data$ = callMethodWithPlaylistId(playlistId);

    return data$;
  }

  function callMethodWithPlaylistId(playlistId: string): Observable<ServiceModel<PlaylistItem[]>> {
    const pageArgs = new PageArguments(1, '123');
    const resources = [
      PlaylistItemResourceProperties.id
    ];
    const data$ = service.getById(playlistId, pageArgs, resources);

    return data$;
  }

  function callMethodWithPageArgs(pageArgs: PageArguments): Observable<ServiceModel<PlaylistItem[]>> {
    const playlistId = '123';
    const resources = [
      PlaylistItemResourceProperties.id
    ];
    const data$ = service.getById(playlistId, pageArgs, resources);

    return data$;
  }

  function callMethodWithResources(
    resources:  PlaylistItemResourceProperties[]
  ): Observable<ServiceModel<PlaylistItem[]>> {
    const pageArgs = new PageArguments(1, '123');
    const playlistId = '123';
    const data$ = service.getById(playlistId, pageArgs, resources);

    return data$;
  }
});
