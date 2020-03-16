import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentComponent } from './comment.component';
import { Comment } from 'src/app/models/comment/comment';
import { CommentCreateUtilities } from 'src/tests-common/create-utilities/comment-create-utilities';
import { ExceptionConstants } from 'src/app/shared/Constants/exception-constants';
import { FormatterService } from 'src/app/services-singleton/formatter.service';

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

  it('with not object input type should throw an exception', () => {
    // Arrange
    const commentInput: any = 'str';
    component.comment = commentInput;

    const exceptionRegex = new RegExp(ExceptionConstants.INCORRECT_TYPE);

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

  it('with comment with authorChannelId should render <a></a> tag with class=\'channel-title\' with image inside', () => {
    // Arrange
    setCommentsAuthorId('123');
    fixture.detectChanges();

    const imgTitleElement = getImgChannelTitleElement(fixture.nativeElement);

    // Act

    // Assert
    expect(imgTitleElement).toBeTruthy();
  });

  it('with comment with authorChannelId should render <a></a> tag with class=\'channel-title\' with authorDisplayName', () => {
    // Arrange
    setCommentsAuthorId('123');
    fixture.detectChanges();

    const authorTitleElement = getAuthroChannelTitleElement(fixture.nativeElement);

    // Act

    // Assert
    expect(authorTitleElement).toBeTruthy();
  });

  it('with comment with authorChannelId should render <a></a> tag with class=\'channel-title\' without disabled attribute', () => {
    // Arrange
    setCommentsAuthorId('123');
    fixture.detectChanges();

    const imgTitleElement = getImgChannelTitleElement(fixture.nativeElement);

    // Act

    // Assert
    expect(imgTitleElement.hasAttribute('disabled')).toBeFalsy();
  });

  it('with comment with authorChannelId should render <a></a> tag with class=\'channel-title\' with authorDisplayName without disabled attribute', () => {
    // Arrange
    setCommentsAuthorId('123');
    fixture.detectChanges();

    const authorTitleElement = getAuthroChannelTitleElement(fixture.nativeElement);

    // Act

    // Assert
    expect(authorTitleElement.hasAttribute('disabled')).toBeFalsy();
  });

  it('with comment without authorChannelId should render <a></a> tag with class=\'channel-title\' and img tag inside and disabled attribute', () => {
    // Arrange
    const imgTitleElement = getImgChannelTitleElement(fixture.nativeElement);

    // Act

    // Assert
    expect(imgTitleElement.hasAttribute('disabled')).toBeTruthy();
  });

  it('with comment without authorChannelId should render <a></a> tag with class=\'channel-title\' with authorDisplayName with disabled attribute', () => {
    // Arrange
    const authorTitleElement = getAuthroChannelTitleElement(fixture.nativeElement);

    // Act

    // Assert
    expect(authorTitleElement.hasAttribute('disabled')).toBeTruthy();
  });

  it('should render author name', () => {
    // Arrange
    const authorName = 'randomAuthorName';
    component.comment.snippet.authorDisplayName = authorName;

    // Act
    fixture.detectChanges();

    // Assert
    expect(fixture.nativeElement.innerHTML).toContain(authorName);
  });

  it('should render date', () => {
    // Arrange
    const date: any = '10.10.2020';
    comment.snippet.publishedAt = date;

    formatterService.getDateFromNowString.and.callFake((argument) => {
      return argument;
    });

    // Act
    fixture.detectChanges();

    // Assert
    expect(fixture.nativeElement.innerHTML).toContain(date);
  });

  function getAuthroChannelTitleElement(element: Element): Element {
    const imgTitleElement = getImgChannelTitleElement(element);
    imgTitleElement.remove();

    const authorTitleElement = element.querySelector('a.channel-title');

    return authorTitleElement;
  }

  function getImgChannelTitleElement(element: Element): Element {
    const imgChildTag = element.querySelector('a.channel-title img');
    const aTagElement = imgChildTag.parentElement;

    return aTagElement;
  }

  function setCommentsAuthorId(authorId: string): void {
    const authorChannelId = { value: authorId };
    comment.snippet.authorChannelId = authorChannelId;
  }
});
