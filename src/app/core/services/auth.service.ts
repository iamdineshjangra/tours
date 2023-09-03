import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Signup, UserResponse, User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://localhost:4100/api/v1';
  constructor(private http: HttpClient) { }

  signup(value: Signup) {
    return this.http.post<UserResponse>(`${this.apiUrl}/signup`, value).subscribe({
      next: (data) => {
        if(data && data.token) {
          localStorage.setItem('token', data.token);
        }
      },
      error: (err) => {
        console.log(err.error.errMessage);
        localStorage.clear();
      },
    })
  }

  isAuthenticated() {
    return localStorage.getItem('token');
  }

}
