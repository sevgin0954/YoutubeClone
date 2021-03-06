import { CommentThreadsService } from './comment-threads.service';
import { CommentThreadOrder } from '../../shared/enums/comment-thread-order';
import { PageArguments } from '../../shared/arguments/page-arguments';
import { CommentThread } from '../../models/comment/comment-thread';
import { ServiceModel } from '../../models/service-models/service-model';
import { Observable, of } from 'rxjs';
import { MainConstants } from '../../shared/constants/main-constants';
import { ExceptionConstants } from '../../shared/constants/exception-constants';
import { ArgumentsUtilities } from 'src/tests-common/utilities/arguments-utilities';

describe('', () => {
  let httpClient: any;
  let service: CommentThreadsService;
  let pageArgs: PageArguments;

  beforeEach(() => httpClient = jasmine.createSpyObj('HttpClient', ['get']));
  beforeEach(() => service = new CommentThreadsService(httpClient));
  beforeEach(() => pageArgs = new PageArguments(1, null));

  describe('CommentThreadsService', () => {

    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('CommentThreadsService getByVideoId', () => {

    it('should call httpClient service with correct path', () => {
      // Arrange
      const expectedUrl = MainConstants.YOUTUBE_BASE_URL + '/commentThreads';

      // Act
      callMethodWithDefaultArguments();

      // Assert
      const urlArgument = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 0);
      expect(urlArgument).toContain(expectedUrl);
    });

    it('with videoId should call httpClient service with query params with videoId', () => {
      // Arrange
      const videoId = '123';
      const queryParam = `videoId=${videoId}`;

      // Act
      callMethodWithId(videoId);

      // Assert
      const urlArgument = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 0);
      expect(urlArgument).toContain(queryParam);
    });

    it('with null videoId should throw an exception', () => {
      // Arrange
      const videoId = null;
      const exceptionRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);

      // Act

      // Assert
      expect(() => callMethodWithId(videoId)).toThrowError(exceptionRegex);
    });

    it('with empty videoId should throw an exception', () => {
      // Arrange
      const videoId = '';
      const exceptionRegex = new RegExp(ExceptionConstants.EMPTY_STRING);

      // Act

      // Assert
      expect(() => callMethodWithId(videoId)).toThrowError(exceptionRegex);
    });

    it('with order should call httpClient service with query params with order', () => {
      // Arrange
      const order = CommentThreadOrder.relevance;
      const orderQueryParam = `order=${CommentThreadOrder[order]}`;

      // Act
      callMethodWithOrder(order);

      // Assert
      const urlArgument = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 0);
      expect(urlArgument).toContain(orderQueryParam);
    });

    it('with null order should throw an exception', () => {
      // Arrange
      const exceptionRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);
      const order = null;

      // Act

      // Assert
      expect(() => callMethodWithOrder(order)).toThrowError(exceptionRegex);
    });

    it('with pageArgs with maxResults should call httpClient service with maxResults', () => {
      // Arrange
      pageArgs = new PageArguments(1, undefined);
      const maxResultsQuery = `maxResults=${pageArgs.maxResults}`;

      // Act
      callMethodWithDefaultArguments();

      // Assert
      const urlArgument = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 0);
      expect(urlArgument).toContain(maxResultsQuery);
    });

    it('with pageArgs with pageToken should call httpClient with pageToken', () => {
      // Arrange
      pageArgs.pageToken = '123';
      const pageTokenQuery = `pageToken=${pageArgs.pageToken}`;

      // Act
      callMethodWithDefaultArguments();

      // Assert
      const urlArgument = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 0);
      expect(urlArgument).toContain(pageTokenQuery);
    });

    it('with pageArgs with null pageToken should call httpClient without pageToken', () => {
      // Arrange
      pageArgs.pageToken = null;
      const pageTokenKey = 'pageToken';

      // Act
      callMethodWithDefaultArguments();

      // Assert
      const urlArgument = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 0);
      expect(urlArgument.indexOf(pageTokenKey) === -1).toBeTruthy();
    });

    it('should return data from httpClient', () => {
      // Arrange
      const expectedData$ = of('123');
      httpClient.get.and.returnValue(expectedData$);

      // Act
      const actualData$ = callMethodWithDefaultArguments();

      // Assert
      expect(actualData$).toEqual(expectedData$);
    });

    function callMethodWithDefaultArguments(): Observable<ServiceModel<CommentThread[]>> {
      const videoId = '123;'
      const data$ = callMethodWithId(videoId);

      return data$;
    }

    function callMethodWithId(videoId: string): Observable<ServiceModel<CommentThread[]>> {
      const order = CommentThreadOrder.relevance;
      const data$ = service.getByVideoId(videoId, order, pageArgs);

      return data$;
    }

    function callMethodWithOrder(order: CommentThreadOrder): Observable<ServiceModel<CommentThread[]>> {
      const videoId = '123;'
      const data$ = service.getByVideoId(videoId, order, pageArgs);

      return data$;
    }
  });
});
