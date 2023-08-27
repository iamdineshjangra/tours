import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tour } from '../models/tour';

@Injectable({
  providedIn: 'root',
})
export class TourService {
  apiUrl = 'https://localhost:4100/api/v1/tours';
  constructor(private http: HttpClient) {}
  getAllTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.apiUrl);
  }
}
