import { PlaylistService } from './playlist.service';
import { ExceptionConstants } from 'src/app/shared/constants/exception-constants';
import { ServiceModel } from 'src/app/models/service-models/service-model';
import { Playlist } from 'src/app/models/playlist/playlist';
import { Observable, of } from 'rxjs';
import { PageArguments } from 'src/app/shared/arguments/page-arguments';
import { PlaylistResource } from 'src/app/shared/enums/resource-properties/playlist-resource';
import { ArgumentsUtilities } from 'src/tests-common/utilities/arguments-utilities';
import { MainConstants } from 'src/app/shared/constants/main-constants';
import { ServiceModelCreateUtilities } from 'src/tests-common/create-utilities/service-model-create-utilities';

describe('', () => {
  let service: PlaylistService;
  let httpService: any;

  beforeEach(() => {
    httpService = jasmine.createSpyObj('HttpClient', ['get']);
  });
  beforeEach(() => {
    service = new PlaylistService(httpService);
  });

  describe('PlaylistsService', () => {

    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('PlaylistsService\'s getByIds method', () => {

    it('with null ids should throw an exception', () => {
      // Arrange
      const ids = null;
      const exceptionRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);

      // Act

      // Assert
      expect(() => callMethodWithIds(ids)).toThrowError(exceptionRegex);
    });

    it('with empty ids collection should throw an exception', () => {
      // Arrange
      const ids = [];
      const exceptionRegex = new RegExp(ExceptionConstants.EMPTY_COLLECTION);

      // Act

      // Assert
      expect(() => callMethodWithIds(ids)).toThrowError(exceptionRegex);
    });

    it('with ids with empty id inside the collection should throw an exception', () => {
      // Arrange
      const ids = ['123', ''];
      const exceptionRegex = new RegExp(ExceptionConstants.EMPTY_STRING);

      // Act

      // Assert
      expect(() => callMethodWithIds(ids)).toThrowError(exceptionRegex);
    });

    it('with ids with null id inside the collection should throw an exception', () => {
      // Arrange
      const ids = ['123', null];
      const exceptionRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);

      // Act

      // Assert
      expect(() => callMethodWithIds(ids)).toThrowError(exceptionRegex);
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

    it('with empty resources collection should throw an exception', () => {
      // Arrange
      const resources = [];
      const exceptionRegex = new RegExp(ExceptionConstants.EMPTY_COLLECTION);

      // Act

      // Assert
      expect(() => callMethodWithResources(resources)).toThrowError(exceptionRegex);
    });

    it('with resources with null resources inside the collection should throw an exception', () => {
      // Arrange
      const resources = [
        PlaylistResource.id,
        null
      ];
      const exceptionRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);

      // Act

      // Assert
      expect(() => callMethodWithResources(resources)).toThrowError(exceptionRegex);
    });

    it('with ids should call httpClient with query params with ids separated by a comma', () => {
      // Arrange
      const id1 = '123';
      const id2 = '345';
      const ids = [id1, id2];

      const expectedIdsQuery = `id=${id1},${id2}`;

      // Act
      callMethodWithIds(ids);

      // Assert
      const httpClientUrlArgument: string = ArgumentsUtilities.getMostRecentArgument(httpService.get, 0);
      const queryArgument = httpClientUrlArgument.split('?')[1];
      expect(queryArgument).toContain(expectedIdsQuery);
    });

    it('with pageArgs with pageToken should call httpClient with query params with pageToken', () => {
      // Arrange
      const pageArgs = new PageArguments(1, '123');
      const pageTokenQuery = `pageToken=${pageArgs.pageToken}`;

      // Act
      callMethodWithPageArgs(pageArgs);

      // Assert
      const httpClientUrlArgument: string = ArgumentsUtilities.getMostRecentArgument(httpService.get, 0);
      expect(httpClientUrlArgument).toContain(pageTokenQuery);
    });

    it('with pageArgs with undefined pageToken should call httpClient with query params without pageToken', () => {
      // Arrange
      const pageArgs = new PageArguments(1, undefined);
      const pageTokenQueryKey = `pageToken`;

      // Act
      callMethodWithPageArgs(pageArgs);

      // Assert
      const httpClientUrlArgument: string = ArgumentsUtilities.getMostRecentArgument(httpService.get, 0);
      expect(httpClientUrlArgument).not.toContain(pageTokenQueryKey);
    });

    it('with resources should call httpClient with query params with resources separated by a comma', () => {
      // Arrange
      const resource1 = PlaylistResource.id;
      const resource2 = PlaylistResource.contentDetails;
      const resources = [resource1, resource2];

      const resource1Name = PlaylistResource[resource1];
      const resource2Name = PlaylistResource[resource2];
      const resourcesQuery = `part=${resource1Name},${resource2Name}`;

      // Act
      callMethodWithResources(resources);

      // Assert
      const httpClientUrlArgument: string = ArgumentsUtilities.getMostRecentArgument(httpService.get, 0);
      expect(httpClientUrlArgument).toContain(resourcesQuery);
    });

    it('should call httpClient with correct path', () => {
      // Arrange
      const expectedPath = MainConstants.YOUTUBE_BASE_URL + '/' + 'playlists';

      // Act
      callMethodWithDefaultArguments();

      // Assert
      const httpClientUrlArgument: string = ArgumentsUtilities.getMostRecentArgument(httpService.get, 0);
      expect(httpClientUrlArgument.startsWith(expectedPath)).toBeTruthy();
    });

    it('should return the data returned from the httpClient', () => {
      // Arrange
      const serviceModel = ServiceModelCreateUtilities.create();
      const expectedData$ = of(serviceModel);
      httpService.get.and.returnValue(expectedData$);

      // Act
      const actualData$ = callMethodWithDefaultArguments();

      // Assert
      expect(actualData$).toEqual(expectedData$);
    });

    function callMethodWithDefaultArguments(): Observable<ServiceModel<Playlist[]>> {
      const ids = ['123'];
      const data$ = callMethodWithIds(ids);

      return data$;
    }

    function callMethodWithPageArgs(pageArgs: PageArguments): Observable<ServiceModel<Playlist[]>> {
      const ids = ['123'];
      const resources = [PlaylistResource.id];
      const data$ = service.getByIds(ids, pageArgs, resources);

      return data$;
    }

    function callMethodWithResources(resources: PlaylistResource[]): Observable<ServiceModel<Playlist[]>> {
      const ids = ['123'];
      const pageArgs = new PageArguments(1, '123');
      const data$ = service.getByIds(ids, pageArgs, resources);

      return data$;
    }

    function callMethodWithIds(ids: string[]): Observable<ServiceModel<Playlist[]>> {
      const pageArgs = new PageArguments(1, '123');
      const resources = [PlaylistResource.id];
      const data$ = service.getByIds(ids, pageArgs, resources);

      return data$;
    }
  });
});
