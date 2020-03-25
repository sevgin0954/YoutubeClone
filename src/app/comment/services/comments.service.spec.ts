import { CommentsService } from './comments.service';
import { ServiceModel } from 'src/app/models/service-models/service-model';
import { Observable, of } from 'rxjs';
import { PageArguments } from 'src/app/shared/arguments/page-arguments';
import { CommentResource } from 'src/app/shared/enums/resource-properties/comment-resource';
import { Comment } from 'src/app/models/comment/comment';
import { ExceptionConstants } from 'src/app/shared/Constants/exception-constants';
import { ArgumentsUtilities } from 'src/tests-common/utilities/arguments-utilities';
import { MainConstants } from 'src/app/shared/Constants/main-constants';

describe('', () => {
  let httpClient: any;
  let service: CommentsService;

  beforeEach(() => {
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);
  });
  beforeEach(() => {
    service = new CommentsService(httpClient);
  });

  describe('CommentsService', () => {

    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('CommentsService\'s getByParentId method', () => {

    it('with null parentId should throw an exception', () => {
      // Arrange
      const parentId = null;
      const exceptionRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);

      // Act

      // Assert
      expect(() => callMethodWithParentId(parentId)).toThrowError(exceptionRegex);
    });

    it('with empty parentId should an exception', () => {
      // Arrange
      const parentId = '';
      const exceptionRegex = new RegExp(ExceptionConstants.EMPTY_STRING);

      // Act

      // Assert
      expect(() => callMethodWithParentId(parentId)).toThrowError(exceptionRegex);
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

    it('with parentId should call httpClient with query params with parentId', () => {
      // Arrange
      const parentId = '123';
      const parentIdQuery = `parentId=${parentId}`;

      // Act
      callMethodWithParentId(parentId);

      // Assert
      const urlArgument = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 0);
      expect(urlArgument).toContain(parentIdQuery);
    });

    it('with pageArgs with maxResults should call httpClient with query params with maxResults', () => {
      // Arrange
      const pageArgs = new PageArguments(1, undefined);
      const maxResultsQuery = `maxResults=${pageArgs.maxResults}`;

      // Act
      callMethodWithPageArgs(pageArgs);

      // Assert
      const urlArgument = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 0);
      expect(urlArgument).toContain(maxResultsQuery);
    });

    it('with pageArgs with pageToken should call httpClient with query params with pageToken', () => {
      // Arrange
      const pageArgs = new PageArguments(1, '123');
      const pageTokenQuery = `pageToken=${pageArgs.pageToken}`;

      // Act
      callMethodWithPageArgs(pageArgs);

      // Assert
      const urlArgument = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 0);
      expect(urlArgument).toContain(pageTokenQuery);
    });

    it('with pageArgs with undefined pageToken should call httpClient with query params without pageToken', () => {
      // Arrange
      const pageArgs = new PageArguments(1, undefined);
      const pageTokenQueryKey = 'pageToken';

      // Act
      callMethodWithPageArgs(pageArgs);

      // Assert
      const urlArgument = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 0);
      expect(urlArgument).not.toContain(pageTokenQueryKey);
    });

    it('with resources should call httpClient with resources separated by a comma', () => {
      // Arrange
      const resource1 = CommentResource.id;
      const resource2 = CommentResource.snippet;
      const resources = [resource1, resource2];

      const resource1Name = CommentResource[resource1];
      const resource2Name = CommentResource[resource2];
      const resourcesQuery = `part=${resource1Name},${resource2Name}`;

      // Act
      callMethodWithResources(resources);

      // Assert
      const urlArgument = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 0);
      expect(urlArgument).toContain(resourcesQuery);
    });

    it('should call httpClient with correct path', () => {
      // Arrange
      const expectedPath = MainConstants.YOUTUBE_BASE_URL + '/' + 'comments';

      // Act
      callMethodWithDefaultArguments();

      // Assert
      const urlArgument: string = ArgumentsUtilities.getMostRecentArgument(httpClient.get, 0);
      expect(urlArgument.startsWith(expectedPath)).toBeTruthy();
    });

    it('should return the data from the httpClient', () => {
      // Arrange
      const expectedData = of('123');
      httpClient.get.and.returnValue(expectedData);

      // Act
      const actualData$ = callMethodWithDefaultArguments();

      // Assert
      expect(actualData$).toEqual(expectedData);
    });

    function callMethodWithDefaultArguments(): Observable<ServiceModel<Comment[]>> {
      const parentId = '123';
      const data$ = callMethodWithParentId(parentId);

      return data$;
    }

    function callMethodWithPageArgs(pageArgs: PageArguments): Observable<ServiceModel<Comment[]>> {
      const parentId = '123';
      const resources = [CommentResource.id];
      const data$ = service.getByParentId(parentId, pageArgs, resources);

      return data$;
    }

    function callMethodWithParentId(parentId: string): Observable<ServiceModel<Comment[]>> {
      const pageArgs = new PageArguments(1, undefined);
      const resources = [CommentResource.id];
      const data$ = service.getByParentId(parentId, pageArgs, resources);

      return data$;
    }

    function callMethodWithResources(resources: CommentResource[]): Observable<ServiceModel<Comment[]>> {
      const pageArgs = new PageArguments(1, undefined);
      const parentId = '123';
      const data$ = service.getByParentId(parentId, pageArgs, resources);

      return data$;
    }
  });
});
