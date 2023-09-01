import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { TourService } from 'src/app/core/services/tour.service';
import { Observable, catchError, of, throwError } from 'rxjs';
import { ToursResponse } from 'src/app/core/models/tour';

export const toursResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  tourService: TourService = inject(TourService)
): Observable<ToursResponse> => {
  return tourService.getAllTours().pipe(
    catchError((error: any) => {
      return of(error);
    })
  )
};
