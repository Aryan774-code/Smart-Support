import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('user'));
  isLoggedIn$ = this._isLoggedIn.asObservable();

  login(username: string, password: string) {
    localStorage.setItem('user', JSON.stringify({ username }));
    this._isLoggedIn.next(true);
    return of({ username, token: 'demo-token' });
  }

  register(username: string, password: string) {
    localStorage.setItem('user', JSON.stringify({ username }));
    this._isLoggedIn.next(true);
    return of({ username });
  }

  logout() {
    localStorage.removeItem('user');
    this._isLoggedIn.next(false);
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }
}
