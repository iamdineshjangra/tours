import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Tour, TourResponse } from 'src/app/core/models/tour';
import { TourService } from 'src/app/core/services/tour.service';

@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.scss'],
})
export class TourDetailsComponent {
  tour: Tour | null | undefined = null;
  errMessage: string = '';
  successMessage: string = '';
  constructor(
    private route: ActivatedRoute,
    private tourService: TourService,
    private router: Router
  ) {
    this.getTour();
  }

  getTour() {
    this.route.data.subscribe({
      next: (data) => {
        if (data && data['tour'] && data['tour'].tour) {
          const tour = data['tour'].tour;
          this.tour = tour;
        }
        if (
          data &&
          data['tour'] &&
          data['tour'].error &&
          data['tour'].error.errMessage
        ) {
          this.errMessage = data['tour'].error.errMessage;
        }
      },
      error: (err) => {
        this.errMessage = err.error.errMessage;
        console.log(err.error.errMessage);
      },
    });
  }

  deleteTour(tourId: number) {
    this.tourService.deleteTour(tourId).subscribe({
      next: (data) => {
        this.successMessage = 'Tour deleted successfully.';
        setTimeout(()=> {
          this.router.navigate(['api/v1/tours']);
        }, 3000)
      },
      error: (err) => {
        this.errMessage = err.error.errMessage;
      },
    });
  }
}
