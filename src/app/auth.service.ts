import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const tokenKey = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient) { }

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
