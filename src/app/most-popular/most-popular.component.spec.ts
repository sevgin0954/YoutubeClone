import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostPopularComponent } from './most-popular.component';

let component: MostPopularComponent;
let fixture: ComponentFixture<MostPopularComponent>;

beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [MostPopularComponent],
    schemas: [NO_ERRORS_SCHEMA]
  });
});

beforeEach(() => {
  fixture = TestBed.createComponent(MostPopularComponent);
  component = fixture.componentInstance;
});

describe('MostPopularComponent', () => {

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('during initialization should load videos in ngOnInit', () => {
    // Arrange

    // Act

    // Assert
  });

  it('should not allow to load more videos while loading videos during the initialization', () => {
    // Arrange

    // Act

    // Assert
  });

  it('when the bottom of the page is reached should load more videos', () => {
    // Arrange

    // Act

    // Assert
  });

  it('when the bottom of the page is reached should add the newly loaded videos to the videos collection', () => {
    // Arrange

    // Act

    // Assert
  });

  it('should not allow to load more videos while loading videos when bottom is reached', () => {
    // Arrange

    // Act

    // Assert
  });

  it('should call videoService.getMostPopular with', () => {
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
