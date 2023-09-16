import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Tour } from 'src/app/core/models/tour';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent {
  @Input() tour: Tour | undefined

  constructor(private router: Router) {}

  goToTourDetailsPage(tourId: number) {
    return this.router.navigate(['tours', tourId]);
  }
}
