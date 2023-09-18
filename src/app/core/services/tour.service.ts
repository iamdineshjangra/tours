import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ToursResponse, TourResponse, Tour } from '../models/tour';

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

  deleteTour(tourId: number): Observable<null> {
    return this.http.delete<null>(`${this.apiUrl}/${tourId}`);
  }

  createTour(data: Tour): Observable<Tour> {
    return this.http.post<Tour>(`${this.apiUrl}`, data);
  }
}
