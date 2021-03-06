import { SubscriptionsService } from "./subscriptions.service";
import { ExceptionConstants } from '../shared/constants/exception-constants';
import { Observable, of } from 'rxjs';
import { Subscription } from '../models/subscribption/subscription';
import { SubscriptionResource } from '../shared/enums/resource-properties/subscription-resource';
import { MainConstants } from '../shared/constants/main-constants';
import { ServiceModel } from '../models/service-models/service-model';
import { SubscriptionSnippetResourceId } from '../models/subscribption/subscription-snippet-resourceId';
import { ArgumentsUtilities } from 'src/tests-common/utilities/arguments-utilities';

describe('', () => {
  let httpClient: any;
  let service: any;

  beforeEach(() => {
    httpClient = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete']);
  });
  beforeEach(() => {
    service = new SubscriptionsService(httpClient);
  });

  describe('SubscriptionsService', () => {

    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('SubscriptionsService\s getById method', () => {

    const returnedDataItem1 = { id: '123', snippet: null };
    const returnedData: ServiceModel<Subscription[]> = {
      items: [returnedDataItem1],
      nextPageToken: null,
      pageInfo: null
    };
    let returnData$ = of(returnedData);
    beforeEach(() => {
      httpClient.get.and.returnValue(returnData$);
    });

    it('with null channelId should throw an exception', () => {
      // Arrange
      const channelId = null;
      const exceptionRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);

      // Act

      // Assert
      expect(() => callMethodWithChannelId(channelId)).toThrowError(exceptionRegex);
    });

    it('with empty channelId should throw an exception', () => {
      // Arrange
      const channelId = '';
      const exceptionRegex = new RegExp(ExceptionConstants.EMPTY_STRING);

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

    it('should call httpClient with correct path', () => {
      // Arrange
      const expectedPath = MainConstants.YOUTUBE_BASE_URL + '/' + 'subscriptions';

      // Act
      callMethodWithDefaultArguments();

      // Assert
      const actualPath = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 0);
      expect(actualPath).toContain(expectedPath);
    });

    it('with channelId should call httpClient with query params with forChannelId=channelId', () => {
      // Arrange
      const channelId = '123';
      const channelIdQuery = `forChannelId=${channelId}`;

      // Act
      callMethodWithChannelId(channelId);

      // Assert
      const actualUrl = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 0);
      expect(actualUrl).toContain(channelIdQuery);
    });

    it('with resources should call httpClient with query params with the resources reparated by a comma', () => {
      // Arrange
      const resource1 = SubscriptionResource.id;
      const resource2 = SubscriptionResource.snippet;
      const resources = [resource1, resource2];

      const resourcesQuery =
        `part=${SubscriptionResource[resource1]},${SubscriptionResource[resource2]}`;

      // Act
      callMethodWithResources(resources);

      // Assert
      const actualUrl = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 0);
      expect(actualUrl).toContain(resourcesQuery);
    });

    it('should return the first item from the returned value from the httpClient', done => {
      // Arrange

      // Act
      const data$ = callMethodWithDefaultArguments();

      // Assert
      data$.subscribe(actualData => {
        expect(actualData).toBe(returnedDataItem1);
        done()
      });
    });

    function callMethodWithDefaultArguments(): Observable<Subscription> {
      const channelId = '123';
      const data$ = callMethodWithChannelId(channelId);

      return data$;
    }

    function callMethodWithChannelId(channelId: string): Observable<Subscription> {
      const resources = [
        SubscriptionResource.id
      ];
      const data$ = service.getById(channelId, resources);

      return data$;
    }

    function callMethodWithResources(
      resources: SubscriptionResource[]
    ): Observable<Subscription> {
      const channelId = '123';
      const data$ = service.getById(channelId, resources);

      return data$;
    }
  });

  describe('SubscriptionsService\s subscribe method', () => {

    it('with null channelId should throw an exception', () => {
      // Arrange
      const channelId = null;
      const exceptionRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);

      // Act

      // Assert
      expect(() => callMethodWithChannelId(channelId)).toThrowError(exceptionRegex);
    });

    it('with empty channelId should throw an exception', () => {
      // Arrange
      const channelId = '';
      const exceptionRegex = new RegExp(ExceptionConstants.EMPTY_STRING);

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

    it('with channelId should call httpClient with body with snippet with resourceId property with channelId ', () => {
      // Arrange
      const channelId = '123';
      const expectedResourceId: SubscriptionSnippetResourceId = {
        kind: null,
        channelId: channelId
      };

      // Act
      callMethodWithChannelId(channelId);

      // Assert
      const actualBody = ArgumentsUtilities.getMostRecentArgument(httpClient.post, 1);
      const actualResourceId = actualBody.snippet.resourceId;
      expect(actualResourceId.channelId).toEqual(expectedResourceId.channelId);
    });

    it('should call httpClient with body with resourceId property with correct kind', () => {
      // Arrange
      const expectedResourceId: SubscriptionSnippetResourceId = {
        kind: "youtube#channel",
        channelId: null
      };

      // Act
      callMethodWithDefaultArguments();

      // Assert
      const actualBody = ArgumentsUtilities.getMostRecentArgument(httpClient.post, 1);
      const actualResourceId = actualBody.snippet.resourceId;
      expect(actualResourceId.kind).toEqual(expectedResourceId.kind);
    });

    it('should call httpClient with query params with only resources property', () => {
      // Arrange
      const resource1 = SubscriptionResource.id;
      const resources = [resource1];
      const resourcesQuery = `part=${SubscriptionResource[resource1]}`;

      // Act
      callMethodWithResources(resources);

      // Assert
      const actualUrl = ArgumentsUtilities.getMostRecentArgument(httpClient.post, 0);
      const actualQuery = actualUrl.split('?')[1];
      expect(actualQuery).toEqual(resourcesQuery);
    });

    it('with resources should call httpClient with query params with resources splited by a comma', () => {
      // Arrange
      const resource1 = SubscriptionResource.id;
      const resource2 = SubscriptionResource.snippet;
      const resources = [resource1, resource2];
      const resourcesQuery
        = `part=${SubscriptionResource[resource1]},${SubscriptionResource[resource2]}`;

      // Act
      callMethodWithResources(resources);

      // Assert
      const actualUrl = ArgumentsUtilities.getMostRecentArgument(httpClient.post, 0);
      expect(actualUrl).toContain(resourcesQuery);
    });

    it('should call httpClient with correct path', () => {
      // Arrange
      const expectedPath = MainConstants.YOUTUBE_BASE_URL + '/' + 'subscriptions';

      // Act
      callMethodWithDefaultArguments();

      // Assert
      const actualUrl = ArgumentsUtilities.getMostRecentArgument(httpClient.post, 0);
      expect(actualUrl.startsWith(expectedPath)).toBeTruthy();
    });

    it('should return the newly created subscription', () => {
      // Arrange
      const subsciption: Subscription = {
        id: '123',
        snippet: null
      };
      const expectedData$ = of(subsciption);
      httpClient.post.and.returnValue(expectedData$);

      // Act
      const actualData$ = callMethodWithDefaultArguments();

      // Assert
      expect(actualData$).toBe(expectedData$);
    });

    function callMethodWithChannelId(channelId: string): Observable<Subscription> {
      const resources = [
        SubscriptionResource.id
      ];
      const data$ = service.subscribe(channelId, resources);

      return data$;
    }

    function callMethodWithDefaultArguments(): Observable<Subscription> {
      const channelId = '123';
      const data$ = callMethodWithChannelId(channelId);

      return data$;
    }

    function callMethodWithResources(
      resources: SubscriptionResource[]
    ): Observable<Subscription> {
      const channelId = '123';
      const data$ = service.subscribe(channelId, resources);

      return data$;
    }
  });

  describe('SubscriptionsService\s unsubscribe method', () => {

    const returnedData = {
      status: 200
    };
    const returnedData$ = of(returnedData);

    beforeEach(() => {
      httpClient.delete.and.returnValue(returnedData$);
    });

    it('with null channelId should throw an exception', () => {
      // Arrange
      const channelId = null;
      const exceptionRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);

      // Act

      // Assert
      expect(() => service.unsubscribe(channelId)).toThrowError(exceptionRegex);
    });

    it('with undefined channelId should throw an exception', () => {
      // Arrange
      const channelId = undefined;
      const exceptionRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);

      // Act

      // Assert
      expect(() => service.unsubscribe(channelId)).toThrowError(exceptionRegex);
    });

    it('with empty channelId should throw an exception', () => {
      // Arrange
      const channelId = '';
      const exceptionRegex = new RegExp(ExceptionConstants.EMPTY_STRING);

      // Act

      // Assert
      expect(() => service.unsubscribe(channelId)).toThrowError(exceptionRegex);
    });

    it('should call htppClient with query params with only id', () => {
      // Arrange
      const channelId = '123';
      const expectedQuery = `id=${channelId}`;

      // Act
      service.unsubscribe(channelId);

      // Assert
      const actualUrl = ArgumentsUtilities.getMostRecentArgument(httpClient.delete, 0);
      const actualQuery = actualUrl.split('?')[1];
      expect(actualQuery).toEqual(expectedQuery);
    });

    it('with channelId should call htppClient with query params with id=channelId', () => {
      // Arrange
      const channelId = '123';
      const idQuery = `id=${channelId}`;

      // Act
      service.unsubscribe(channelId);

      // Assert
      const actualUrl = ArgumentsUtilities.getMostRecentArgument(httpClient.delete, 0);
      expect(actualUrl).toContain(idQuery);
    });

    it('should call httpClient with correct path', () => {
      // Arrange
      const expectedPath = MainConstants.YOUTUBE_BASE_URL + '/' + 'subscriptions';

      // Act
      callMethodWithDefaultArguments();

      // Assert
      const actualPath = ArgumentsUtilities.getMostRecentArgument(httpClient.delete, 0);
      expect(actualPath.startsWith(expectedPath)).toBeTruthy();
    });

    it('with responce with status should return the returned status code from httpClient', done => {
      // Arrange

      // Act
      const actualData$ = callMethodWithDefaultArguments();

      // Assert
      actualData$.subscribe(actualResponceCode => {
        expect(actualResponceCode).toEqual(returnedData.status);
        done();
      });
    });

    function callMethodWithDefaultArguments(): Observable<number> {
      const channelId = '123';
      const data$ = service.unsubscribe(channelId);

      return data$;
    }
  });
});
