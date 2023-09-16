import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tour } from 'src/app/core/models/tour';

@Component({
  selector: 'app-searched-tour',
  templateUrl: './searched-tour.component.html',
  styleUrls: ['./searched-tour.component.scss']
})
export class SearchedTourComponent implements OnInit {
  tours: Tour[] = [];
  errMessage: string = '';
  constructor(private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.getAllTours();
  }

  getAllTours() {
    this.route.data.subscribe({
      next: (data) => {
        if (
          data &&
          data['searchedTours'] &&
          data['searchedTours'].tours &&
          data['searchedTours'].tours.length
        ) {
          this.tours = data['searchedTours'].tours;
          this.getSearchedTours()
        }
        if (
          data &&
          data['searchedTours'] &&
          data['searchedTours'].error &&
          data['searchedTours'].error.errMessage
        ) {
          this.errMessage = data['searchedTours'].error.errMessage;
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

  getSearchedTours() {
    if(this.tours) {
      const searchedString = this.router.url.split('/')[2]
      const originalSearchedString = searchedString.replace(/%20/g, ' ');
      this.tours = this.tours.filter(tour => tour.title.toLowerCase() === originalSearchedString.toLowerCase());
    }
  }
}
