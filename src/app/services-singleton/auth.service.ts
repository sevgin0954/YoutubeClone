import { Injectable } from '@angular/core';

import { Constants } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  setToken(token: string): void {
    localStorage.setItem(Constants.AuthTokenKey, token);
  }

  getToken(): string {
    return localStorage.getItem(Constants.AuthTokenKey);
  }

  logout(): void {
    localStorage.removeItem(Constants.AuthTokenKey);
  }
}
