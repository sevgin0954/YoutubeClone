import { ChannelService } from './channel.service';
import { of, Observable } from 'rxjs';
import { MainConstants } from '../shared/Constants/main-constants';
import { TestConstants } from 'src/tests-common/test-constants';
import { HttpClientHelpers } from 'src/tests-common/htpp-client-helpers';
import { PageArguments } from '../shared/arguments/page-arguments';
import { ChannelResourceProperties } from '../shared/enums/resource-properties/channel-resource-properties';
import { Channel } from '../models/channel/channel';
import { ServiceModel } from '../models/service-models/service-model';
import { ExceptionConstants } from '../shared/Constants/exception-constants';

let httpClient: any;
let pageArgs: PageArguments;
let service: ChannelService;

beforeEach(() => {
  httpClient = jasmine.createSpyObj('HttpClient', ['get']);
});
beforeEach(() => {
  service = new ChannelService(httpClient);
});
beforeEach(() => {
  pageArgs = new PageArguments(1, null);
});

describe('ChannelService', () => {

  it('should be created', () => {
    // Act
    expect(service).toBeTruthy();
  });
});

describe('ChannelService\'s getSubscriptions method', () => {

  it('should call httpClient get', () => {
    // Arrange

    // Act
    callMethodWithDefaultResources();

    // Arrange
    expect(httpClient.get).toHaveBeenCalledTimes(1);
  });

  it('should return the data from the httpClient', () => {
    // Arrange
    const data$ = of('data');
    httpClient.get.and.returnValue(data$);

    // Act
    const dataResult$ = callMethodWithDefaultResources();

    // Arrange
    expect(dataResult$).toBe(data$);
  });

  it('should call httpClient with url path', () => {
    // Arrange
    const expectedPath: string = `${MainConstants.BASE_URL}/subscriptions`;

    // Act
    callMethodWithDefaultResources();

    // Arrange
    const actualPath = HttpClientHelpers.getHttpClientUrlArgument(httpClient.get);
    expect(actualPath.startsWith(expectedPath)).toBeTruthy();
  });

  it('with resourceProprties should call httpClient get with query param with resource properies', () => {
    // Arrange
    const snippetResourceProperty = ChannelResourceProperties.snippet;
    const idResourceProperty = ChannelResourceProperties.id;
    const partParam = getChannelResourceString(snippetResourceProperty, idResourceProperty);

    // Act
    service.getSubscriptions(pageArgs, [snippetResourceProperty, idResourceProperty]);

    // Arrange
    const actualPath = HttpClientHelpers.getHttpClientUrlArgument(httpClient.get);
    expect(actualPath).toContain(partParam);
  });

  it('should call httpClient get with query params with mine=true', () => {
    // Arrange
    const mineParam = 'mine=true';

    // Act
    callMethodWithDefaultResources();

    // Arrange
    const actualPath = HttpClientHelpers.getHttpClientUrlArgument(httpClient.get);
    expect(actualPath).toContain(mineParam);
  });

  it('with maxResults should call httpClient get with query params with maxResult', () => {
    // Arrange
    const maxResultsKey = TestConstants.MAX_RESULTS_QUERY_PARAM_KEY;
    const maxResults = 1;
    const maxResultParam = `${maxResultsKey}=${maxResults}`;

    pageArgs.maxResults = maxResults;

    // Act
    callMethodWithDefaultResources();

    // Arrange
    const actualPath = HttpClientHelpers.getHttpClientUrlArgument(httpClient.get);
    expect(actualPath).toContain(maxResultParam);
  });

  it('with negative maxResults should trow an exception', () => {
    // Arrange
    const errorRegex = new RegExp(ExceptionConstants.NEGATIVE_NUMBER);
    pageArgs.maxResults = -1;

    // Act

    // Assert
    expect(() => callMethodWithDefaultResources()).toThrowError(errorRegex);
  });

  it('with null pageArgs should throw an exception', () => {
    // Arrange
    const errorMessage = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);
    pageArgs = null;

    // Act

    // Assert
    expect(() => callMethodWithDefaultResources()).toThrowError(errorMessage)
  });

  it('with pageToken should call httpClient get with query params with pageToken', () => {
    // Arrange
    const pageTokenKey = TestConstants.PAGE_TOKEN_QURY_PARAM_KEY;
    const pageToken = 'abc';
    const pageTokenParam = `${pageTokenKey}=${pageToken}`;

    pageArgs.pageToken = pageToken;

    // Act
    callMethodWithDefaultResources();

    // Arrange
    const actualPath = HttpClientHelpers.getHttpClientUrlArgument(httpClient.get);
    expect(actualPath).toContain(pageTokenParam);
  });

  it('with undefined pageToken should call httpClient get with query param without pageToken', () => {
    // Arrange
    const pageTokenKey = TestConstants.PAGE_TOKEN_QURY_PARAM_KEY;
    pageArgs.pageToken = undefined;

    // Act
    callMethodWithDefaultResources();

    // Arrange
    const actualPath = HttpClientHelpers.getHttpClientUrlArgument(httpClient.get);
    expect(actualPath.indexOf(pageTokenKey)).toEqual(-1);
  });

  it('with null pageToken should call httpClient get with query param without pageToken', () => {
    // Arrange
    const pageTokenKey = TestConstants.PAGE_TOKEN_QURY_PARAM_KEY;
    pageArgs.pageToken = null;

    // Act
    callMethodWithDefaultResources();

    // Arrange
    const actualPath = HttpClientHelpers.getHttpClientUrlArgument(httpClient.get);
    expect(actualPath.indexOf(pageTokenKey)).toEqual(-1);
  });

  it('with null resourceProprties should throw an exception', () => {
    // Assert
    const errorRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);

    // Act

    // Arrange
    expect(() => service.getSubscriptions(pageArgs, null)).toThrowError(errorRegex);
  });

  it('with empty resourceProprties should throw an exception', () => {
    // Arrange
    const errorRegex = new RegExp(ExceptionConstants.EMPTY_COLLECTION);
    const resourceProperties = [];

    // Act

    // Assert
    expect(() => service.getSubscriptions(pageArgs, resourceProperties)).toThrowError(errorRegex);
  });

  function callMethodWithDefaultResources(): Observable<ServiceModel<Channel[]>> {
    const data$ = service.getSubscriptions(pageArgs, [ChannelResourceProperties.id]);

    return data$;
  }
});

describe('ChannelService\'s getByIds method', () => {
  it('should call httpClient get method', () => {
    // Arrange

    // Act
    callMethodWithDefaultArguments();

    // Assert
    expect(httpClient.get).toHaveBeenCalledTimes(1);
  });

  it('should return data from the httpClient', () => {
    // Arrange
    const expectedData = of('abc');
    httpClient.get.and.returnValue(expectedData);

    // Act
    const data$ = callMethodWithDefaultArguments();

    // Assert
    expect(data$).toEqual(expectedData);
  });

  it('should call httpClient get with query param with resource propery', () => {
    // Arrange
    const idResourceProperty = ChannelResourceProperties.id;
    const snippetResourceProperty = ChannelResourceProperties.snippet;
    const resourceQueryParam = getChannelResourceString(idResourceProperty, snippetResourceProperty);

    // Act
    service.getByIds(['123'], pageArgs, [idResourceProperty, snippetResourceProperty]);

    // Assert
    const urlArgument = HttpClientHelpers.getHttpClientUrlArgument(httpClient.get);
    expect(urlArgument).toContain(resourceQueryParam);
  });

  it('with ids should call httpClient with query params with ids', () => {
    // Arrange
    const id1 = 'abc';
    const id2 = '123';
    const idsQueryParam = `${id1},${id2}`;

    // Act
    service.getByIds([id1, id2], pageArgs, [ChannelResourceProperties.id]);

    // Assert
    const argument = HttpClientHelpers.getHttpClientUrlArgument(httpClient.get);
    expect(argument).toContain(idsQueryParam);
  });

  it('with maxResults should call httpClient with query params with maxResults', () => {
    // Arrange
    pageArgs.maxResults = 1;
    const maxResultQueryString = `maxResults=${pageArgs.maxResults}`;

    // Act
    callMethodWithDefaultArguments();

    // Assert
    const argument = HttpClientHelpers.getHttpClientUrlArgument(httpClient.get);
    expect(argument).toContain(maxResultQueryString);
  });

  it('with negative maxResults should trow an exception', () => {
    // Arrange
    const errorRegex = new RegExp(ExceptionConstants.NEGATIVE_NUMBER);
    pageArgs.maxResults = -1;

    // Act

    // Assert
    expect(() => callMethodWithDefaultArguments()).toThrowError(errorRegex);
  });

  it('with pageToken should call httpClient with query params with pageToken', () => {
    // Arrange
    pageArgs.pageToken = '123';
    const maxpageTokenQueryString = `pageToken=${pageArgs.maxResults}`;

    // Act
    callMethodWithDefaultArguments();

    // Assert
    const argument = HttpClientHelpers.getHttpClientUrlArgument(httpClient.get);
    expect(argument).toContain(maxpageTokenQueryString);
  });

  it('with undefinded pageToken should call httpClient with query params without pageToken', () => {
    // Arrange
    const pageTokenKey = 'pageToken';
    pageArgs.pageToken = undefined;

    // Act
    callMethodWithDefaultArguments();

    // Assert
    const argument = HttpClientHelpers.getHttpClientUrlArgument(httpClient.get);
    expect(argument.indexOf(pageTokenKey) === -1).toBeTruthy();
  });

  it('with null pageToken should call httpClient with query params without pageToken', () => {
    // Arrange
    const pageTokenKey = 'pageToken';
    pageArgs.pageToken = null;

    // Act
    callMethodWithDefaultArguments();

    // Assert
    const argument = HttpClientHelpers.getHttpClientUrlArgument(httpClient.get);
    expect(argument.indexOf(pageTokenKey) === -1).toBeTruthy();
  });

  it('with resourceProperties should call httpClient with query params with resource properties', () => {
    // Arrange
    const idResourceProperty = ChannelResourceProperties.id;
    const snippetResourceProperty = ChannelResourceProperties.snippet;
    const partQueryString = getChannelResourceString(idResourceProperty, snippetResourceProperty);

    // Act
    service.getByIds(['123'], pageArgs, [idResourceProperty, snippetResourceProperty]);

    // Assert
    const argument = HttpClientHelpers.getHttpClientUrlArgument(httpClient.get);
    expect(argument).toContain(partQueryString);
  });

  it('with emtpy resourceProperties should throw an exception', () => {
    // Arrange
    const exceptionRegex = new RegExp(ExceptionConstants.EMPTY_COLLECTION);
    const resourceProperties = [];

    // Act

    // Assert
    expect(() => service.getByIds(['a'], pageArgs, resourceProperties)).toThrowError(exceptionRegex);
  });

  it('with null resourceProperties should throw an exception', () => {
    // Arrange
    const exceptionRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);
    const resourceProperties = null;

    // Act

    // Assert
    expect(() => service.getByIds(['a'], pageArgs, resourceProperties)).toThrowError(exceptionRegex);
  });

  function callMethodWithDefaultArguments(): Observable<ServiceModel<Channel[]>> {
    const resourceProperties = [ChannelResourceProperties.id];
    const ids = ['123'];
    const data$ = service.getByIds(ids, pageArgs, resourceProperties);

    return data$;
  }
});

function getChannelResourceString(resourceProperty1: number, resourceProeprty2: number): string {
  const resource1String = ChannelResourceProperties[resourceProperty1];
  const resource2String = ChannelResourceProperties[resourceProeprty2];
  const partParam = `part=${resource1String},${resource2String}`;

  return partParam;
}
