import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MeResponse, User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'http://localhost:4100/api/v1/users';
  constructor(private http: HttpClient) { }

  me(): Observable<MeResponse> {
    return this.http.get<MeResponse>(`${this.apiUrl}/me`)
  }
}
