import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentComponent } from './comment.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('without comment input should throw an exception', () => {
    // Arrange

    // Act

    // Assert
  });

  it('', () => {
    // Arrange

    // Act

    // Assert
  });

  it('', () => {
    // Arrange

    // Act

    // Assert
  });

  it('', () => {
    // Arrange

    // Act

    // Assert
  });

  it('', () => {
    // Arrange

    // Act

    // Assert
  });
});
