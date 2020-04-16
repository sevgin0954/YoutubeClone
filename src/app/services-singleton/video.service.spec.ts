import { VideoService } from "./video.service";
import { ExceptionConstants } from '../shared/constants/exception-constants';
import { Observable } from 'rxjs';
import { ServiceModel } from '../models/service-models/service-model';
import { Video } from '../models/video/video';
import { PageArguments } from '../shared/arguments/page-arguments';
import { VideoResource } from '../shared/enums/resource-properties/video-resource';
import { RegionCode } from '../shared/enums/region-code';
import { UrlUtilities } from 'src/tests-common/utilities/url-utilities';
import { MainConstants } from '../shared/constants/main-constants';
import { ArgumentsUtilities } from 'src/tests-common/utilities/arguments-utilities';

describe('', () => {
  let httpClient: any;
  let service: VideoService;

  beforeEach(() => {
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);
  });
  beforeEach(() => {
    service = new VideoService(httpClient);
  });

  describe('VideoService', () => {

    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('VideoService\s getMostPopular method', () => {

    it('with null region code should throw an exception', () => {
      // Arrange
      const regionCode = null;
      const exceptionRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);

      // Act

      // Assert
      expect(() => callMethodWithRegionCode(regionCode)).toThrowError(exceptionRegex);
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
      expect(() => callMethodWithResouces(resources)).toThrowError(exceptionRegex);
    });

    it('with empty resources should throw an exception', () => {
      // Arrange
      const resources = [];
      const exceptionRegex = new RegExp(ExceptionConstants.EMPTY_COLLECTION);

      // Act

      // Assert
      expect(() => callMethodWithResouces(resources)).toThrowError(exceptionRegex);
    });

    it('with resources with null resource in the collection should throw an exception', () => {
      // Arrange
      const resources = [
        VideoResource.id,
        null
      ];
      const exceptionRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);

      // Act

      // Assert
      expect(() => callMethodWithResouces(resources)).toThrowError(exceptionRegex);
    });

    it('with regionCode should call httpClient with query params with regionCode', () => {
      // Arrange
      const regionCode = RegionCode.BG;
      const regionCodeQuery = `regionCode=${RegionCode[regionCode]}`;

      // Act
      callMethodWithRegionCode(regionCode);

      // Assert
      const actualUrl = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 0);
      expect(actualUrl).toContain(regionCodeQuery);
    });

    it('with pageArgs with undefined pageToken should call httpClient without pageToken', () => {
      // Arrange
      const pageArgs = new PageArguments(1, undefined);
      const pageTokenQueryKey = 'pageToken';

      // Act
      callMethodWithPageArgs(pageArgs);

      // Assert
      const actualUrl = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 0);
      expect(actualUrl).not.toContain(pageTokenQueryKey);
    });

    it('should call httpClient with query params with chart=mostPopular', () => {
      // Arrange
      const chartQuery = 'chart=mostPopular';

      // Act
      callMethodWithDefaultArguments();

      // Assert
      const actualUrl = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 0);
      expect(actualUrl).toContain(chartQuery);
    });

    it('with pageArgs with maxResult should call httpClient with query params with maxResults', () => {
      // Arrange
      const pageArgs = new PageArguments(1, undefined);
      const maxResultsQuery = `maxResults=${pageArgs.maxResults}`;

      // Act
      callMethodWithPageArgs(pageArgs);

      // Assert
      const actualUrl = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 0);
      expect(actualUrl).toContain(maxResultsQuery);
    });

    it('with resources should call httpClient with query params with resources joined by a comma', () => {
      // Arrange
      const resources = [
        VideoResource.id,
        VideoResource.fileDetails
      ];
      const resource1Name = VideoResource[resources[0]];
      const resource2Name = VideoResource[resources[1]];
      const resourcesQuery = `part=${resource1Name},${resource2Name}`;

      // Act
      callMethodWithResouces(resources);

      // Assert
      const actualUrl = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 0);
      expect(actualUrl).toContain(resourcesQuery);
    });

    it('with repeating resources should call httpClient with query params with only distinct resources joined by a comma', () => {
      // Arrange
      const resource = VideoResource.id;
      const resources = [
        resource,
        resource
      ];
      const resourceName = VideoResource[resource];
      const expectedResourcesQuery = `part=${resourceName}`;

      // Act
      callMethodWithResouces(resources);

      // Assert
      const actualUrl = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 0);
      const actualResourceQuery = UrlUtilities.getQueryParam(actualUrl);
      expect(actualResourceQuery).toEqual(expectedResourcesQuery);
    });

    it('should call httpClient with correct path', () => {
      // Arrange
      const expectedPath = MainConstants.YOUTUBE_BASE_URL + '/' + 'videos';

      // Act
      callMethodWithDefaultArguments();

      // Assert
      const actualUrl = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 0);
      expect(actualUrl).toContain(expectedPath);
    });

    function callMethodWithDefaultArguments(): Observable<ServiceModel<Video[]>> {
      const regionCode = RegionCode.BG;
      const data$ = callMethodWithRegionCode(regionCode);

      return data$;
    }

    function callMethodWithPageArgs(pageArgs: PageArguments): Observable<ServiceModel<Video[]>> {
      const regionCode = RegionCode.BG;
      const resources = [
        VideoResource.id
      ];
      const data$ = service.getMostPopular(regionCode, pageArgs, resources);

      return data$;
    }

    function callMethodWithRegionCode(regionCode: RegionCode): Observable<ServiceModel<Video[]>> {
      const pageArgs = new PageArguments(1, undefined);
      const resources = [
        VideoResource.id
      ];
      const data$ = service.getMostPopular(regionCode, pageArgs, resources);

      return data$;
    }

    function callMethodWithResouces(
      resources: VideoResource[]
    ): Observable<ServiceModel<Video[]>> {
      const pageArgs = new PageArguments(1, undefined);
      const regionCode = RegionCode.BG;
      const data$ = service.getMostPopular(regionCode, pageArgs, resources);

      return data$;
    }
  });
});
