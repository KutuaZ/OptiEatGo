import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly KEY = 'optieat_token';

  constructor() {}

  isAuthenticated(): boolean {
    try {
      return !!localStorage.getItem(this.KEY);
    } catch (e) {
      return false;
    }
  }

  login(token: string) {
    try {
      localStorage.setItem(this.KEY, token);
    } catch (e) {}
  }

  logout() {
    try {
      localStorage.removeItem(this.KEY);
    } catch (e) {}
  }

  getToken(): string | null {
    try {
      return localStorage.getItem(this.KEY);
    } catch (e) {
      return null;
    }
  }
}
