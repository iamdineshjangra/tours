import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { TourService } from 'src/app/core/services/tour.service';
import { Observable } from 'rxjs';
import { ToursResponse } from 'src/app/core/models/tour';

export const toursResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  tourService: TourService = inject(TourService)
): Observable<ToursResponse> => {
  return tourService.getAllTours();
};
