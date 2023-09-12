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
          let dateFormat = 'YYYY-DD-MM HH:mm:ss';
          tour.startDate = moment.utc(tour.startDate).local().format(dateFormat);
          tour.endDate = moment.utc(tour.endDate).local().format(dateFormat);
          this.tour = tour;
        }
        if (
          data &&
          data['tour'] &&
          data['tour'].error &&
          data['tour'].error.errMessage
        ) {
          this.errMessage = data['tour'].error.errMessage;
          this.removeErrorMessage()
        }
      },
      error: (err) => {
        this.errMessage = err.error.errMessage;
        this.removeErrorMessage()
      },
    });
  }

  deleteTour(tourId: number) {
    this.tourService.deleteTour(tourId).subscribe({
      next: (data) => {
        this.successMessage = 'Tour deleted successfully.';
        setTimeout(()=> {
          this.successMessage = ''
          this.router.navigate(['tours']);
        }, 3000)
      },
      error: (err) => {
        this.errMessage = err.error.errMessage;
        this.removeErrorMessage();
      },
    });
  }

  removeErrorMessage() {
    setTimeout(() => {
      this.errMessage = '';
    }, 3000)
  }
}
