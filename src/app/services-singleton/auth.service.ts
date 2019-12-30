import { Injectable } from '@angular/core';

const tokenKey = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  setToken(token: string): void {
    localStorage.setItem(tokenKey, token);
  }

  getToken(): string {
    return localStorage.getItem(tokenKey);
  }

  logout(): void {
    localStorage.clear();
  }
}
