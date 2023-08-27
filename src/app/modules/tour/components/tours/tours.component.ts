import { Component, OnInit } from '@angular/core';
import { Tour } from 'src/app/core/models/tour';
import { TourService } from 'src/app/core/services/tour.service';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss'],
})
export class ToursComponent implements OnInit {
  tours: Tour[] = [];
  constructor(private tourService: TourService) {}

  ngOnInit(): void {
    this.getAllTours();
  }

  getAllTours() {
    this.tourService.getAllTours().subscribe(
      (data) => {
        if (data) {
          this.tours = data;
        }
      },
      (err) => {
        console.log(err.error.errMessage)
      }
    )
  }
}
