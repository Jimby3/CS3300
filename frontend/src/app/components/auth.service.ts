// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string, rememberMe: boolean): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        // Ensure you're getting the expected response
        console.log('Response from login:', response);
        const userId = response.userId;
        if (rememberMe) {
          localStorage.setItem('userId', userId);
        } else {
          sessionStorage.setItem('userId', userId);
        }
      }),
      catchError(error => {
        console.error('Login failed:', error);
        return throwError(error);
      })
    );
  }


  // Clear stored credentials
  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('userId');
    sessionStorage.removeItem('userId');
  }

  // Check if the user is logged in by checking for token presence
  isLoggedIn(): boolean {
    return !!localStorage.getItem('userId') || !!sessionStorage.getItem('userId');
  }

  // Retrieve token from either localStorage or sessionStorage
  getToken(): string | null {
    return localStorage.getItem('userId') || sessionStorage.getItem('userId');
  }

  static getToken(): string | null {
    return localStorage.getItem('userId') || sessionStorage.getItem('userId');
  }

  static getUserId(): number | null {
    const userId = AuthService.getToken();
    return userId ? Number(userId) : null;
  }

  // Handle user registration
  register(name: string, email: string, password: string): Observable<any> {
    const body = { name, email, password };
    console.log(body);
    return this.http.post(`${this.baseUrl}/register`, body);
  }
}
