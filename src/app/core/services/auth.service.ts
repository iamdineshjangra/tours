import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Signup, UserResponse, User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://localhost:4100/api/v1';
  constructor(private http: HttpClient, private router: Router) {}

  isAuthenticated() {
    return localStorage.getItem('token');
  }

  signup(value: Signup) {
    return this.http
      .post<UserResponse>(`${this.apiUrl}/signup`, value)
      .subscribe({
        next: (data) => {
          if (data && data.token) {
            localStorage.setItem('token', data.token);
            this.router.navigate(['api/v1/tours'])
          }
        },
        error: (err) => {
          console.log(err.error.errMessage);
        },
      });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['api/v1/login']);
  }
}
