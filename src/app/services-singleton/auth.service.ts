import { Injectable } from '@angular/core';

import { MainConstants } from 'src/app/shared/Constants/main-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  setToken(token: string): void {
    localStorage.setItem(MainConstants.AuthTokenKey, token);
  }

  getToken(): string {
    return localStorage.getItem(MainConstants.AuthTokenKey);
  }

  logout(): void {
    localStorage.removeItem(MainConstants.AuthTokenKey);
  }
}
