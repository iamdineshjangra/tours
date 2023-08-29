import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TourResponse } from 'src/app/core/models/tour';

@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.scss'],
})
export class TourDetailsComponent {
  tour: TourResponse | null | undefined = null;
  constructor(private route: ActivatedRoute) {
    this.getTour()
  }
  getTour() {
    this.route.data.subscribe({
      next: (data) => {
        if (data && data['tour'] && data['tour'].tour) {
          this.tour = data['tour'].tour;
        }
      },
      error: (err) => {
        console.log(err.error.errMessage);
      },
    });
  }
}
