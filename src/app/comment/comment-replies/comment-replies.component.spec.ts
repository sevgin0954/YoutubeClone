import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentRepliesComponent } from './comment-replies.component';
import { ExceptionConstants } from 'src/app/shared/Constants/exception-constants';
import { CommentsService } from '../services/comments.service';
import { Comment } from 'src/app/models/comment/comment';
import { of } from 'rxjs';
import { ArgumentsUtilities } from 'src/tests-common/utilities/arguments-utilities';
import { PageArguments } from 'src/app/shared/arguments/page-arguments';
import { ServiceModelCreateUtilities } from 'src/tests-common/create-utilities/service-model-create-utilities';

const COMMENT_COMPONENT_SELECTOR = 'app-comment';
const LOADING_COMPONENT_SELECTOR = 'app-loading';

let component: CommentRepliesComponent;
let fixture: ComponentFixture<CommentRepliesComponent>;
let commentsService: any;

beforeEach(() => {
  commentsService = jasmine.createSpyObj('CommentsService', ['getByParentId']);
});
beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [
      CommentRepliesComponent
    ],
    providers: [
      { provide: CommentsService, useValue: commentsService }
    ],
    schemas: [NO_ERRORS_SCHEMA]
  });
});
beforeEach(() => {
  fixture = TestBed.createComponent(CommentRepliesComponent);
  component = fixture.componentInstance;
});

describe('CommentRepliesComponent', () => {

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('without totalRepliesCount should throw an exception', () => {
    // Arrange
    const exceptionRegex = new RegExp(ExceptionConstants.REQUIRED_INPUT);

    // Act

    // Assert
    expect(() => fixture.detectChanges()).toThrowError(exceptionRegex);
  });

  it('with less tnan 1 totalRepliesCount should throw an exception', () => {
    // Arrange
    // @ts-ignore
    component.parentId = '123';
    component.totalRepliesCount = 0;
    const exceptionRegex = new RegExp(ExceptionConstants.NUMBER_OUT_OF_RANGE);

    // Act

    // Assert
    expect(() => fixture.detectChanges()).toThrowError(exceptionRegex);
  });

  it('with not number type for totalRepliesCount should throw an exception', () => {
    // Arrange
    const totalRepliesCount = 'a';
    setupComponentWithTotalRepliesCount(totalRepliesCount);
    const exceptionRegex = new RegExp(ExceptionConstants.INCORRECT_TYPE);

    // Act

    // Assert
    expect(() => fixture.detectChanges()).toThrowError(exceptionRegex);
  });

  it('without parentId should throw an exception', () => {
    // Arrange
    const exceptionRegex = new RegExp(ExceptionConstants.REQUIRED_INPUT);

    // Act

    // Assert
    expect(() => fixture.detectChanges()).toThrowError(exceptionRegex);
  });

  it('with not string type for parentId should throw an exception', () => {
    // Arrange
    const parentId = 3;
    setupComponentWithParentId(parentId);
    const exceptionRegex = new RegExp(ExceptionConstants.INCORRECT_TYPE);

    // Act

    // Assert
    expect(() => fixture.detectChanges()).toThrowError(exceptionRegex);
  });

  function setupComponentWithParentId(parentId: any): void {
    // @ts-ignore
    component.parentId = parentId;
    component.totalRepliesCount = 1;
  }

  function setupComponentWithTotalRepliesCount(totalRepliesCount: any): void {
    component.totalRepliesCount = totalRepliesCount;
    // @ts-ignore
    component.parentId = '123';
  }
});

describe('CommentRepliesComponent\'s onShowMoreReplies method', () => {

  let comments = createComments();
  let serviceModel = ServiceModelCreateUtilities.create(comments);

  beforeEach(() => {
    const data$ = of(serviceModel);
    commentsService.getByParentId.and.returnValue(data$);
  });

  it('without next page with replies should throw an exception', () => {
    // Arrange
    serviceModel.nextPageToken = undefined;
    const exceptionRegex = new RegExp(ExceptionConstants.INVALID_OPERATION);

    // Act
    component.onShowMoreReplies();

    // Assert
    expect(() => component.onShowMoreReplies()).toThrowError(exceptionRegex);
  });

  it('with negative totalRepliesCount should throw an exception', () => {
    // Arrange
    component.totalRepliesCount = -1;
    // @ts-ignore
    component.parentId = '123';
    const exceptionRegex = new RegExp(ExceptionConstants.NUMBER_OUT_OF_RANGE);

    // Act

    // Assert
    expect(() => fixture.detectChanges()).toThrowError(exceptionRegex);
  });

  [
    comments.length - 1,
    comments.length + 1
  ].forEach(totalRepliesCount => {
    it('at second page with next page with replies but with not up-to-data totalRepliesCount should have shouldShowMoreRepliesBtn set to true', () => {
      // Arrange
      component.totalRepliesCount = totalRepliesCount;
      // Second page pageToken
      serviceModel.nextPageToken = '123';

      // Act
      // Load first page
      component.onShowMoreReplies();

      // Assert
      expect(component.shouldShowMoreRepliesBtn).toBeTruthy();
    });
  });

  [
    comments.length - 1,
    comments.length + 1
  ].forEach(totalRepliesCount => {
    it('at second page with next page with replies but with not up-to-data totalRepliesCount should load more replies', () => {
      // Arrange
      component.totalRepliesCount = totalRepliesCount;
      // Second page pageToken
      serviceModel.nextPageToken = '123';

      // Act
      // Load first page
      component.onShowMoreReplies();
      // Load second page
      component.onShowMoreReplies();

      // Assert
      const expectedData = comments.concat(comments);
      expect(expectedData).toEqual(component.comments);
    });
  });

  [
    comments.length - 1,
    comments.length + 1
  ].forEach(totalRepliesCount => {
    it('at first  with next page with replies but with not up-to-data totalRepliesCount should have shouldShowMoreRepliesBtn set to true', () => {
      // Arrange
      component.totalRepliesCount = totalRepliesCount;
      serviceModel.nextPageToken = '123';

      // Act
      component.onShowMoreReplies();

      // Assert
      expect(component.shouldShowMoreRepliesBtn).toBeTruthy();
    });
  });

  [
    comments.length - 1,
    comments.length + 1
  ].forEach(totalRepliesCount => {
    it('at first page with more replies but with not up-to-data totalRepliesCount should load more replies', () => {
      // Arrange
      component.totalRepliesCount = totalRepliesCount;
      serviceModel.nextPageToken = '123';

      // Act
      component.onShowMoreReplies();

      // Assert
      const expectedReplies = comments;
      expect(component.comments).toBeTruthy(expectedReplies);
    });
  });

  it('at first page should call commentsService.getByParentId without pageToken', () => {
    // Arrange

    // Act
    component.onShowMoreReplies();

    // Assert
    const actualPageArgs: PageArguments = ArgumentsUtilities
      .getMostRecentArgument(commentsService.getByParentId, 1);;
    expect(actualPageArgs.pageToken).toBeUndefined();
  });

  it('should call commentsService.getByParentId with pageToken equal to the result of the previous page', () => {
    // Arrange
    // Second page pageToken
    const expectedPageToken = '123';
    serviceModel.nextPageToken = expectedPageToken;

    // Act
    // Load first page
    component.onShowMoreReplies();
    // Load second page
    component.onShowMoreReplies();

    // Assert
    const actualPageArgs: PageArguments = ArgumentsUtilities
      .getMostRecentArgument(commentsService.getByParentId, 1);;
    expect(actualPageArgs.pageToken).toEqual(expectedPageToken);
  });

  it('should change shouldShowLoading to true while loading replies', () => {
    // Arrange
    stubOnFieldValues('shouldShowLoading');

    // Act
    component.onShowMoreReplies();

    // Assert
    const firstArguments = getShouldShowLoadingArguments()[0];
    expect(firstArguments[0]).toBeTruthy();
  });

  it('should change shouldShowMoreRepliesBtn to false while loading replies', () => {
    // Arrange
    stubOnFieldValues('shouldShowMoreRepliesBtn');

    // Act
    component.onShowMoreReplies();

    // Assert
    const firstArguments = getShouldShowMoreRepliesBtnArguments()[0];
    expect(firstArguments[0]).toBeFalsy();
  })

  it('should change shouldShowLoading back to false after it has loaded the replies', () => {
    // Arrange

    // Act
    component.onShowMoreReplies();

    // Assert
    expect(component.shouldShowLoading).toBeFalsy();
  });

  it('with last page should change shouldShowMoreRepliesBtn to false after loading the replies', () => {
    // Arrange
    serviceModel.nextPageToken = undefined;
    component.totalRepliesCount = comments.length;

    // Act
    component.onShowMoreReplies();

    // Assert
    expect(component.shouldShowMoreRepliesBtn).toBeFalsy();
  });

  it('should change shouldShowReplies to true', () => {
    // Arrange

    // Act
    component.onShowMoreReplies();

    // Assert
    expect(component.shouldShowReplies).toBeTruthy();
  });

  function getShouldShowLoadingArguments() {
    const setFunc: any = Object.getOwnPropertyDescriptor(component, 'shouldShowLoading').set;
    const allArgs = setFunc.calls.allArgs();

    return allArgs;
  }

  function getShouldShowMoreRepliesBtnArguments(): boolean[] {
    const setFunc: any = Object.getOwnPropertyDescriptor(component, 'shouldShowMoreRepliesBtn').set;
    const allArgs = setFunc.calls.allArgs();

    return allArgs;
  }

  function stubOnFieldValues(fieldName: keyof CommentRepliesComponent): void {
    Object.defineProperty(component, fieldName, {
      set(newValue) { }, configurable: true
    });
    spyOnProperty(component, fieldName, 'set');
  }
});

describe('CommentRepliesComponent\'s onHideReplies', () => {

  beforeEach(() => {
    component.shouldShowReplies = true;
  });

  it('with already hidden replies should throw an exception', () => {
    // Arrange
    component.shouldShowReplies = false;
    const exceptionRegex = new RegExp(ExceptionConstants.INVALID_OPERATION);

    // Act

    // Assert
    expect(() => component.onHideReplies()).toThrowError(exceptionRegex);
  });

  it('with non-existent element with parentId should throw an exception', () => {
    // Arrange
    spyOn(document, 'getElementById').and.returnValue(null);
    const exceptionRegex = new RegExp(ExceptionConstants.NOT_FOUND);

    // Act

    // Assert
    expect(() => component.onHideReplies()).toThrowError(exceptionRegex);
  });

  it('with element with parentId should scroll to it', () => {
    // Arrange
    const element = createFakeElement();
    spyOn(document, 'getElementById').and.returnValue(element as any);

    // Act
    component.onHideReplies();

    // Assert
    expect(element.hasScrolledToElement).toBeTruthy();
  });

  it('should set shouldShowReplies to false', () => {
    // Arrange
    const element = createFakeElement();
    spyOn(document, 'getElementById').and.returnValue(element as any);

    // Act
    component.onHideReplies();

    // Assert
    expect(component.shouldShowReplies).toBeFalsy();
  });

  interface FakeElement {
    hasScrolledToElement,
    scrollIntoView()
  }

  function createFakeElement(): FakeElement {
    const fakeElement: FakeElement = {
      hasScrolledToElement: false,
      scrollIntoView() {
        this.hasScrolledToElement = true;
      }
    };

    return fakeElement;
  }
});

describe('CommentRepliesComponent\'s onShowReplies', () => {

  beforeEach(() => {
    let serviceModel = ServiceModelCreateUtilities.create();
    const data$ = of(serviceModel);
    commentsService.getByParentId.and.returnValue(data$);
  });

  it('with already shown replies should throw an exception', () => {
    // Arrange
    component.shouldShowReplies = true;
    const exceptionRegex = new RegExp(ExceptionConstants.INVALID_OPERATION);

    // Act

    // Assert
    expect(() => component.onShowReplies()).toThrowError(exceptionRegex);
  });

  it('should set shouldShowReplies to true', () => {
    // Arrange

    // Act
    component.onShowReplies();

    // Assert
    expect(component.shouldShowReplies).toBeTruthy();
  });

  it('at first page should try to load the replies', () => {
    // Arrange

    // Act
    component.onShowReplies();

    // Assert
    expect(commentsService.getByParentId).toHaveBeenCalledTimes(1);
  });

  it('with already loaded replies should not try to load them again', () => {
    // Arrange
    // @ts-ignore
    component.isFirstPage = false;

    // Act
    component.onShowReplies();

    // Assert
    expect(commentsService.getByParentId).not.toHaveBeenCalled();
  });
});

describe('CommentRepliesComponent\'s template', () => {

  const totalRepliesCount = 1;

  beforeEach(() => {
    component.totalRepliesCount = totalRepliesCount;
    // @ts-ignore
    component.parentId = '123';
  });

  it('with false shouldShowReplies should not show replies elements', () => {
    // Arrange
    component.shouldShowReplies = false;

    // Act
    fixture.detectChanges();

    // Assert
    const componentHtml: HTMLElement = fixture.nativeElement.innerHTML;
    expect(componentHtml).not.toContain(COMMENT_COMPONENT_SELECTOR);
  });

  it('with true shouldShowReplies should show replies elements', () => {
    // Arrange
    component.shouldShowReplies = true;
    component.comments = createComments();

    // Act
    fixture.detectChanges();

    // Assert
    const componentHtml: HTMLElement = fixture.nativeElement.innerHTML;
    expect(componentHtml).toContain(COMMENT_COMPONENT_SELECTOR);
  });

  it('with true shouldShowLoading should show loading element', () => {
    // Arrange
    component.shouldShowLoading = true;

    // Act
    fixture.detectChanges();

    // Assert
    const componentHtml: HTMLElement = fixture.nativeElement.innerHTML;
    expect(componentHtml).toContain(LOADING_COMPONENT_SELECTOR);
  });

  it('with false shouldShowLoading should not show loading element', () => {
    // Arrange
    component.shouldShowLoading = false;

    // Act
    fixture.detectChanges();

    // Assert
    const componentHtml: HTMLElement = fixture.nativeElement.innerHTML;
    expect(componentHtml).not.toContain(LOADING_COMPONENT_SELECTOR);
  });

  it('with true shouldShowMoreRepliesBtn and true shouldShowReplies should show show-more-comments button element', () => {
    // Arrange
    component.shouldShowMoreRepliesBtn = true;
    component.shouldShowReplies = true;

    // Act
    fixture.detectChanges();

    // Assert
    const showMoreCommentsBtn = getShowMoreCommentsButton();
    expect(showMoreCommentsBtn).toBeTruthy();
  });

  it('with false shouldShowMoreRepliesBtn and true shouldShowReplies should not show show-more-comments button element', () => {
    // Arrange
    component.shouldShowMoreRepliesBtn = false;
    component.shouldShowReplies = true;

    // Act
    fixture.detectChanges();

    // Assert
    const showMoreCommentsBtn = getShowMoreCommentsButton();
    expect(showMoreCommentsBtn).toBeFalsy();
  });

  it('with true shouldShowMoreRepliesBtn and false shouldShowReplies should not show show-more-comments button element', () => {
    // Arrange
    component.shouldShowMoreRepliesBtn = true;
    component.shouldShowReplies = false;

    // Act
    fixture.detectChanges();

    // Assert
    const showMoreCommentsBtn = getShowMoreCommentsButton();
    expect(showMoreCommentsBtn).toBeFalsy();
  });

  it('when show-more-comments button is clicked should call onShowMoreReplies method', () => {
    // Arrange
    component.shouldShowMoreRepliesBtn = true;
    component.shouldShowReplies = true;

    spyOn(component, 'onShowMoreReplies');

    // Act
    fixture.detectChanges();

    const showMoreCommentsBtn = getShowMoreCommentsButton();
    showMoreCommentsBtn.click();

    // Assert
    expect(component.onShowMoreReplies).toHaveBeenCalledTimes(1);
  });

  it('when show comments button is clicked should call onShowReplies method', () => {
    // Arrange
    component.shouldShowMoreRepliesBtn = true;
    component.shouldShowReplies = true;

    spyOn(component, 'onShowReplies');

    // Act
    fixture.detectChanges();

    const showCommentsBtn = getShowCommentsButton(totalRepliesCount);
    showCommentsBtn.click();

    // Assert
    expect(component.onShowReplies).toHaveBeenCalledTimes(1);
  });

  it('when hide comments button is clicked should call onHideReplies method', () => {
    // Arrange
    component.shouldShowMoreRepliesBtn = true;
    component.shouldShowReplies = true;

    spyOn(component, 'onHideReplies');

    // Act
    fixture.detectChanges();

    const hidenCommentsBtn = getHideCommentsButton();
    hidenCommentsBtn.click();

    // Assert
    expect(component.onHideReplies).toHaveBeenCalledTimes(1);
  });

  function getHideCommentsButton(): HTMLElement {
    const rootElement: HTMLElement = fixture.nativeElement;
    const buttons = rootElement.querySelectorAll('.comments-toggle-button, .show-button');

    const buttonText = 'Hide comments';
    const hideCommentsButton: any = Array.from(buttons).find(btn => btn.innerHTML.includes(buttonText));

    return hideCommentsButton;
  }

  function getShowCommentsButton(repliesCount: number): HTMLElement {
    const rootElement: HTMLElement = fixture.nativeElement;
    const buttons = rootElement.querySelectorAll('.comments-toggle-button, .show-button');

    const buttonText = `Show ${repliesCount} comments`;
    const showCommentsButton: any = Array.from(buttons).find(btn => btn.innerHTML.includes(buttonText));

    return showCommentsButton;
  }

  function getShowMoreCommentsButton(): HTMLElement {
    const rootElement: HTMLElement = fixture.nativeElement;
    const showMoreCommentsBtn: any = rootElement.querySelector('.show-more-button');

    return showMoreCommentsBtn;
  }
});

function createComments(): Comment[] {
  const comments: Comment[] = [
    { id: '123', snippet: undefined },
    { id: '456', snippet: undefined }
  ];

  return comments;
}
