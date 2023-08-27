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
    this.tourService.getAllTours().subscribe({
      next: (data) => {
        if(data && data.tours) {
          this.tours = data.tours;
        }
      },
      error: (error) => {
        console.log(error.error.errMessage)
      }
    })
  }
}
