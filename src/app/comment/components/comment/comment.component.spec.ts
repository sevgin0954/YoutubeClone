import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentComponent } from './comment.component';
import { Comment } from 'src/app/models/comment/comment';
import { CommentCreateUtilities } from 'src/tests-common/create-utilities/comment-create-utilities';
import { ExceptionConstants } from 'src/app/shared/constants/exception-constants';
import { FormatterService } from 'src/app/services-singleton/formatter.service';

describe('', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  let formatterService: any;

  beforeEach(() => {
    formatterService = jasmine.createSpyObj('FormatterService', ['getDateFromNowString']);
  });
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: FormatterService, useValue: formatterService }
      ]
    });
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
  });

  describe('CommentComponent', () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('without comment input should throw an exception', () => {
      // Arrange
      const exceptionRegex = new RegExp(ExceptionConstants.REQUIRED_INPUT);

      // Act

      // Assert
      expect(() => fixture.detectChanges()).toThrowError(exceptionRegex);
    });
  });

  describe('CommentComponent\'s getAuthorChannelId method', () => {

    it('with comment with snippet without authorChannelId should return null', () => {
      // Arrange
      const authorChannelId = undefined;
      const comment = createComment(authorChannelId);

      component.comment = comment;

      // Act
      const result = component.getAuthorChannelId();

      // Assert
      expect(result).toBeNull();
    });

    it('with comment with snippet with authorChannelId should return channelId', () => {
      // Arrange
      const authorChannelId = { value: '345' };
      const comment = createComment(authorChannelId);

      component.comment = comment;

      // Act
      const result = component.getAuthorChannelId();

      // Assert
      expect(result).toEqual(authorChannelId.value);
    });

    function createComment(authorChannelId: { value: string; }): Comment {
      const commentSnippet = CommentCreateUtilities.createSnippet(authorChannelId);
      const comment: Comment = {
        id: '123',
        snippet: commentSnippet
      };

      return comment;
    }
  });

  describe('CommentComponent template', () => {

    let commentSnippet = CommentCreateUtilities.createSnippet();
    let comment: Comment = {
      id: '123',
      snippet: commentSnippet
    };

    beforeEach(() => {
      commentSnippet = CommentCreateUtilities.createSnippet();
      comment = {
        id: '123',
        snippet: commentSnippet
      };
    });
    beforeEach(() => {
      component.comment = comment;
    });
    beforeEach(() => {
      fixture.detectChanges();
    });
  });
});
