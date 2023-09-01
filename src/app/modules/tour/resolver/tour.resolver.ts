import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { EMPTY, Observable, catchError, of } from 'rxjs';
import { TourResponse } from 'src/app/core/models/tour';
import { TourService } from 'src/app/core/services/tour.service';

export const tourResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  tourService: TourService = inject(TourService)
): Observable<TourResponse> | null => {
  const tourId = route.paramMap.get('tourId');
  if(tourId) {
    return tourService.getTour(parseInt(tourId)).pipe(
      catchError((error: any) => {
        return of(error);
      })
    )
  } else {
    return null;
  }
};
