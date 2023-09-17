import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {
  Signup,
  UserResponse,
  User,
  Login,
  ForgetPassword,
  ForgetPasswordResponse,
  ResetPassword,
  ResetPasswordResponse,
} from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://localhost:4100/api/v1';
  constructor(private http: HttpClient, private router: Router) {}

  isAuthenticated() {
    console.log('inAuthenticated')
    return localStorage.getItem('token') && localStorage.getItem('role')
  }

  signup(value: Signup): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.apiUrl}/signup`, value);
  }

  login(value: Login): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.apiUrl}/login`, value);
  }

  forgetPassword(email: ForgetPassword): Observable<ForgetPasswordResponse> {
    return this.http.post<ForgetPasswordResponse>(
      `${this.apiUrl}/forgetPassword`,
      email
    );
  }

  resetPassword(
    userId: number,
    resetToken: string,
    password: string
  ): Observable<ResetPasswordResponse> {
    return this.http.patch<ResetPasswordResponse>(
      `${this.apiUrl}/resetPassword?userId=${userId}&resetToken=${resetToken}`,
      { password }
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
