import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('', () => {
  const AUTH_TOKEN_KEY = 'token';

  describe('AuthService', () => {
    let service: AuthService;

    beforeEach(() => {
      service = TestBed.get(AuthService);
    });

    it('should be created', () => {
      // Assert
      expect(service).toBeTruthy();
    });

    it('setToken should set token from localStorage', () => {
      // Arrange
      const token = 'testToken';
      spyOn(localStorage, 'setItem');

      // Act
      service.setToken(token);

      // Assert
      expect(window.localStorage.setItem).toHaveBeenCalledWith(AUTH_TOKEN_KEY, token);
    });

    it('getToken should get token from localStorage', () => {
      // Arrange
      const tokenValue = 'token';
      spyOn(localStorage, 'getItem').and.returnValue(tokenValue);

      // Act
      const tokenResult = service.getToken();

      // Assert
      expect(tokenResult).toEqual(tokenValue);
    });

    it('logOut shoulg call removeItem of localStorage', () => {
      // Arrange
      spyOn(localStorage, 'removeItem');

      // Act
      service.logout();

      // Assert
      expect(window.localStorage.removeItem).toHaveBeenCalledWith(AUTH_TOKEN_KEY);
    });
  });
});
