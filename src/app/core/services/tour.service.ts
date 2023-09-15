import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ToursResponse, TourResponse, Tour } from '../models/tour';

@Injectable({
  providedIn: 'root',
})
export class TourService {
  apiUrl = 'http://localhost:4100/api/v1/tours';
  filteredTours = new Subject<Tour[]>();
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

  getSearchedTour(value: string, tours: Tour[]) {
    if (tours && tours.length) {
      const filteredTours = tours.filter((tour) =>
        tour.title.toLowerCase().includes(value.toLowerCase())
      );
       this.filteredTours.next(filteredTours);
    } else {
       this.filteredTours.next([]);
    }
  }

}
