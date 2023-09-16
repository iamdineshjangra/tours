import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tour } from 'src/app/core/models/tour';

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
        }
      },
      error: (error) => {
        this.errMessage = error.error.errMessage;
      },
    });
  }
}
