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

  signup(value: Signup): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.apiUrl}/signup`, value);
  }

}
