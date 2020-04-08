import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { NavbarSideComponent } from './navbar-side.component';

describe('', () => {
  const BASE_URL = 'http://localhost:4200';

  let component: NavbarSideComponent;
  let fixture: ComponentFixture<NavbarSideComponent>;

  let routerServiceUrlProperty: jasmine.Spy<InferableFunction>;
  let routerService: any;

  beforeEach(() => {
    routerService = jasmine.createSpy('Router');
    Object.defineProperty(routerService, 'url', {
      get() {
        return '';
      }
    });
    routerServiceUrlProperty = spyOnProperty(routerService, 'url');
  });
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarSideComponent],
      providers: [
        { provide: Router, useValue: routerService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarSideComponent);
    component = fixture.componentInstance;
  });

  describe('NavbarSideComponent', () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('with url without any paths should not throw an exception', () => {
      // Arrange
      const url = BASE_URL;
      routerServiceUrlProperty.and.returnValue(url);

      // Act

      // Assert
      expect(() => fixture.detectChanges()).not.toThrowError();
    });
  });

  describe('NavbarSideComponent\'s template', () => {

    const EXISTING_PATH = 'trending';
    const HIGHLIGHTED_CLASS = 'active';

    it('with url without any paths should not highlight any menu', () => {
      // Arrange
      const url = BASE_URL;
      routerServiceUrlProperty.and.returnValue(url);
      const menues = getMenuElements();

      // Act
      fixture.detectChanges();

      // Assert
      const highlightedElements = menues.filter(m => m.classList.contains(HIGHLIGHTED_CLASS));
      expect(highlightedElements.length).toEqual(0);
    });

    it('with url with path without corresponding menu should not highlight any menu', () => {
      // Arrange
      const notExistingPath = '/notExstingPath';
      const url = BASE_URL + notExistingPath;
      routerServiceUrlProperty.and.returnValue(url);
      const menues = getMenuElements();

      // Act
      fixture.detectChanges();

      // Assert
      const highlightedElements = menues.filter(m => m.classList.contains(HIGHLIGHTED_CLASS));
      expect(highlightedElements.length).toEqual(0);
    });

    it('with url with matching path should highlight one menu element', () => {
      // Arrange
      const url = BASE_URL + '/' + EXISTING_PATH;
      routerServiceUrlProperty.and.returnValue(url);
      const menues = getMenuElements();

      // Act
      fixture.detectChanges();

      // Assert
      const highlightedElements = menues
        .filter(m => m.classList.contains(HIGHLIGHTED_CLASS));
      expect(highlightedElements.length).toEqual(1);
    });

    it('with url should highlight the menu with same data-route attribute value as the last path in the url', () => {
      // Arrange
      const path1 = '/path1';
      const url = BASE_URL + path1 + '/' + EXISTING_PATH;
      routerServiceUrlProperty.and.returnValue(url);

      const menues = getMenuElements();

      // Act
      fixture.detectChanges();

      // Assert
      const firstHighlightedMenu = getHighlightedMenu(menues);
      const dataRouterAttributeValue = firstHighlightedMenu.getAttribute('data-route');
      expect(dataRouterAttributeValue).toEqual(EXISTING_PATH);
    });

    it('with url with query params should highlight the menu with same name as the last path in the url', () => {
      // Arrange
      const queryParams = '?abc=123&cbd=456';
      const url = BASE_URL + '/' + EXISTING_PATH + queryParams;
      routerServiceUrlProperty.and.returnValue(url);

      const menues = getMenuElements();

      // Act
      fixture.detectChanges();

      // Assert
      const firstHighlightedMenu = getHighlightedMenu(menues);
      const dataRouterAttributeValue = firstHighlightedMenu.getAttribute('data-route');
      expect(dataRouterAttributeValue).toEqual(EXISTING_PATH);
    });

    function getHighlightedMenu(menues: Element[]): Element {
      const firstHighlightedMenu = menues.find(m => m.classList.contains(HIGHLIGHTED_CLASS));

      return firstHighlightedMenu;
    }

    function getMenuElements(): Element[] {
      const rootElement: HTMLElement = fixture.nativeElement;
      const menuElements = rootElement.querySelectorAll('nav .navbar-nav .nav-item');

      return Array.from(menuElements);
    }
  });
});
