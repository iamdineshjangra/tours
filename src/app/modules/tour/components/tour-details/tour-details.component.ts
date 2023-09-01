import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tour, TourResponse } from 'src/app/core/models/tour';

@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.scss'],
})
export class TourDetailsComponent {
  tour: Tour | null | undefined = null;
  errMessage: string = '';
  constructor(private route: ActivatedRoute) {
    this.getTour();
  }

  getTour() {
    this.route.data.subscribe({
      next: (data) => {
        if (data && data['tour'] && data['tour'].tour) {
          this.tour = data['tour'].tour;
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
        console.log(err.error.errMessage);
      },
    });
  }
}
