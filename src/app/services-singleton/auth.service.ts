import { Injectable } from '@angular/core';

const AUTH_TOKEN_KEY = 'token'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  setToken(token: string): void {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }

  getToken(): string {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
}
