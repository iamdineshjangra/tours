import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseTour } from '../models/tour';

@Injectable({
  providedIn: 'root',
})
export class TourService {
  apiUrl = 'http://localhost:4100/api/v1/tours';
  constructor(private http: HttpClient) {}
  getAllTours(): Observable<ResponseTour> {
    return this.http.get<ResponseTour>(this.apiUrl);
  }
}
