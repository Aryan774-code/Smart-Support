import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';

// Define a simple structure for our user credentials
interface UserCredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Key for storing registered users in local storage
  private usersStorageKey = 'registeredUsers';
  // Key for tracking the logged-in state
  private loggedInKey = 'isUserLoggedIn';

  // The default, hardcoded user
  private defaultUser: UserCredentials = { username: 'user', password: 'password' };

  // Use a BehaviorSubject to let other components know if the user is logged in
  private loggedIn = new BehaviorSubject<boolean>(this.isCurrentlyLoggedIn());
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private router: Router) {}

  /**
   * Registers a new user by saving their credentials to local storage.
   */
  register(credentials: UserCredentials): Observable<any> {
    const users = this.getRegisteredUsers();

    // Check if the username is already taken (by default user or another registered user)
    const userExists = users.some(u => u.username === credentials.username) || credentials.username === this.defaultUser.username;

    if (userExists) {
      // Return an error observable if the user exists
      return throwError(() => new Error('Username already exists.'));
    }

    // Add the new user to the list and save it back to local storage
    users.push(credentials);
    localStorage.setItem(this.usersStorageKey, JSON.stringify(users));

    // Return a success observable
    return of({ success: true, message: 'Registration successful!' });
  }

  /**
   * Logs a user in by checking credentials against the default user and registered users.
   */
  login(credentials: UserCredentials): Observable<any> {
    const registeredUsers = this.getRegisteredUsers();

    // Check if the credentials match the default user OR any of the registered users
    const isValidUser =
      (credentials.username === this.defaultUser.username && credentials.password === this.defaultUser.password) ||
      registeredUsers.some(u => u.username === credentials.username && u.password === credentials.password);

    if (isValidUser) {
      // On successful login, save the logged-in state
      localStorage.setItem(this.loggedInKey, 'true');
      this.loggedIn.next(true);
      return of({ success: true, message: 'Login successful!' });
    } else {
      // On failure, return an error
      return throwError(() => new Error('Invalid credentials.'));
    }
  }

  /**
   * Logs the user out by clearing the logged-in state.
   */
  logout(): void {
    localStorage.removeItem(this.loggedInKey);
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  /**
   * Checks if the user is currently logged in based on local storage.
   */
  private isCurrentlyLoggedIn(): boolean {
    return localStorage.getItem(this.loggedInKey) === 'true';
  }

  /**
   * Helper function to retrieve and parse the list of registered users from local storage.
   */
  private getRegisteredUsers(): UserCredentials[] {
    const storedUsers = localStorage.getItem(this.usersStorageKey);
    return storedUsers ? JSON.parse(storedUsers) : [];
  }
}

