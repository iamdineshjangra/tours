import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Tour } from 'src/app/core/models/tour';
import { TourService } from 'src/app/core/services/tour.service';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss'],
})
export class ToursComponent implements OnInit {
  tours: Tour[] = [];
  errMessage: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllTours();
  }

  getAllTours() {
    this.route.data.subscribe({
      next: (data) => {
        if (
          data &&
          data['tours'] &&
          data['tours'].tours &&
          data['tours'].tours.length
        ) {
          this.tours = data['tours'].tours;
        }
        if (
          data &&
          data['tours'] &&
          data['tours'].error &&
          data['tours'].error.errMessage
        ) {
          this.errMessage = data['tours'].error.errMessage;
          console.error(this.errMessage);
          return;
        }
      },
      error: (error) => {
        this.errMessage = error.error.errMessage;
        console.error(error.error.errMessage);
      },
    });
  }

  goToTourDetailsPage(tourId: number) {
    return this.router.navigate(['tours', tourId]);
  }
}
