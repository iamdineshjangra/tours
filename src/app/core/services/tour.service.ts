import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToursResponse, TourResponse } from '../models/tour';

@Injectable({
  providedIn: 'root',
})
export class TourService {
  apiUrl = 'http://localhost:4100/api/v1/tours';
  constructor(private http: HttpClient) {}

  getAllTours(): Observable<ToursResponse> {
    return this.http.get<ToursResponse>(this.apiUrl);
  }

  getTour(tourId: number): Observable<TourResponse> {
    return this.http.get<TourResponse>(`${this.apiUrl}/${tourId}`);
  }
}
