import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { Tour, TourResponse } from 'src/app/core/models/tour';
import { ConfirmDeleteService } from 'src/app/core/services/confirm-delete.service';
import { TourService } from 'src/app/core/services/tour.service';

@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.scss'],
})
export class TourDetailsComponent implements OnInit, OnDestroy {
  tour: Tour | null | undefined = null;
  errMessage: string = '';
  successMessage: string = '';
  tourId: number | undefined;
  deleteSubscription: Subscription | undefined;
  constructor(
    private route: ActivatedRoute,
    private tourService: TourService,
    private router: Router,
    private confirmDeleteService: ConfirmDeleteService
  ) {}

  ngOnInit(): void {
    this.getTour();
    this.confirmDelete();
  }

  getTour() {
    this.route.data.subscribe({
      next: (data) => {
        if (data && data['tour'] && data['tour'].tour) {
          const tour = data['tour'].tour;
          let dateFormat = 'YYYY-DD-MM HH:mm:ss';
          tour.startDate = moment
            .utc(tour.startDate)
            .local()
            .format(dateFormat);
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
          this.removeErrorMessage();
        }
      },
      error: (err) => {
        this.errMessage = err.error.errMessage;
        this.removeErrorMessage();
      },
    });
  }

  deleteTour(tourId: number) {
    this.confirmDeleteService.open('tour', tourId);
  }

  confirmDelete() {
    this.deleteSubscription =
      this.confirmDeleteService.deleteStringMessage.subscribe((value) => {
        if (value && value.includes('tour')) {
          this.tourId = parseInt(value.split('/')[1]);
          if (this.tourId) {
            this.tourService.deleteTour(this.tourId).subscribe({
              next: (data) => {
                this.successMessage = 'Tour deleted successfully.';
                this.confirmDeleteService.confirmDelete()
                setTimeout(() => {
                  this.successMessage = '';
                  this.router.navigate(['tours']);
                }, 3000);
              },
              error: (err) => {
                this.errMessage = err.error.errMessage;
                this.confirmDeleteService.cancelDelete();
                this.removeErrorMessage();
              },
            });
          }
        }
      });
  }

  removeErrorMessage() {
    setTimeout(() => {
      this.errMessage = '';
    }, 3000);
  }

  ngOnDestroy(): void {
    if(this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }
}
