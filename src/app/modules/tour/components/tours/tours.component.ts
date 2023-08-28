import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tour } from 'src/app/core/models/tour';
import { TourService } from 'src/app/core/services/tour.service';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss'],
})
export class ToursComponent implements OnInit {
  tours: Tour[] = [];
  constructor(
    private tourService: TourService,
    private routes: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllTours();
  }

  getAllTours() {
    this.routes.data.subscribe({
      next: (data) => {
        if (
          data &&
          data['tours'] &&
          data['tours'].tours &&
          data['tours'].tours.length
        ) {
          this.tours = data['tours'].tours;
        }
      },
      error: (error) => {
        console.log(error.error.errMessage);
      },
    });
  }
}
