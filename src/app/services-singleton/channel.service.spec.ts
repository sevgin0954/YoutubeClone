import { ChannelService } from './channel.service';
import { of } from 'rxjs';
import { Constants } from '../shared/constants';

const MAX_RESULTS_QUERY_PARAM_KEY = 'maxResults';
const PAGE_TOKEN_QURY_PARAM_KEY = 'pageToken';

describe('ChannelService', () => {
  let httpClient;
  let service: ChannelService;

  beforeEach(() => {
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);
  });

  beforeEach(() => {
    service = new ChannelService(httpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getSubscriptions should call httpClient get', () => {
    // Arrange

    // Act
    service.getSubscriptions(1, null);

    // Arrange
    expect(httpClient.get).toHaveBeenCalled();
  });

  it('getSubscriptions should return the data from the httpClient', () => {
    // Arrange
    const data$ = of('data');
    httpClient.get.and.returnValue(data$);

    // Act
    const dataResult$ = service.getSubscriptions(1, null);

    // Arrange
    expect(dataResult$).toBe(data$);
  });

  it('getSubscriptions should call httpClient with correct url path', () => {
    // Arrange
    const expectedPath: string = `${Constants.BASE_URL}/subscriptions`;

    // Act
    service.getSubscriptions(1, null);

    // Arrange
    const actualPath = getHttpClientUrlArgument();
    expect(actualPath.startsWith(expectedPath)).toBeTruthy();
  });

  it('getSubscriptions with should call httpClient get with part=snippet query param', () => {
    // Arrange
    const partParam = 'part=snippet';

    // Act
    service.getSubscriptions(1, null);

    // Arrange
    const actualPath = getHttpClientUrlArgument();
    expect(actualPath).toContain(partParam);
  });

  it('getSubscriptions with should call httpClient get with mine=true query params', () => {
    // Arrange
    const mineParam = 'mine=true';

    // Act
    service.getSubscriptions(1, null);

    // Arrange
    const actualPath = getHttpClientUrlArgument();
    expect(actualPath).toContain(mineParam);
  });

  it('getSubscriptions with maxResults should call httpClient get with query params with max result', () => {
    // Arrange
    const maxResults = 1;
    const maxResultParam = `${MAX_RESULTS_QUERY_PARAM_KEY}=${maxResults}`;

    // Act
    service.getSubscriptions(maxResults, null);

    // Arrange
    const actualPath = getHttpClientUrlArgument();
    expect(actualPath).toContain(maxResultParam);
  });

  it('getSubscriptions with pageToken should call httpClient get with query params with pageToken', () => {
    // Arrange
    const pageToken = 'abc';
    const pageTokenParam = `${PAGE_TOKEN_QURY_PARAM_KEY}=${pageToken}`;

    // Act
    service.getSubscriptions(1, pageToken);

    // Arrange
    const actualPath = getHttpClientUrlArgument();
    expect(actualPath).toContain(pageTokenParam);
  });

  it('getSubscriptions with pageToken undefined should call httpClient get without pageToken query param', () => {
    // Arrange
    const pageToken = undefined;

    // Act
    service.getSubscriptions(1, pageToken);

    // Arrange
    const actualPath = getHttpClientUrlArgument();
    expect(actualPath.indexOf(PAGE_TOKEN_QURY_PARAM_KEY)).toEqual(-1);
  });

  it('getSubscriptions with pageToken null should call httpClient get without pageToken query param', () => {
    // Arrange
    const pageToken = null;

    // Act
    service.getSubscriptions(1, pageToken);

    // Arrange
    const actualPath = getHttpClientUrlArgument();
    expect(actualPath.indexOf(PAGE_TOKEN_QURY_PARAM_KEY)).toEqual(-1);
  });

  function getHttpClientUrlArgument(): string {
    const mostRecentArguments = httpClient.get.calls.mostRecent();
    const path: string = mostRecentArguments.args[0];

    return path;
  }
});
