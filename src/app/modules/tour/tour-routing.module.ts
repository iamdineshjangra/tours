import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToursComponent } from './components/tours/tours.component';
import { toursResolver } from './resolver/tours.resolver';
import { TourDetailsComponent } from './components/tour-details/tour-details.component';
import { tourResolver } from './resolver/tour.resolver';

const routes: Routes = [
  {
    path: '',
    component: ToursComponent,
    resolve: {tours: toursResolver}
  },
  {
    path: ':tourId',
    component: TourDetailsComponent,
    resolve: {tour: tourResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TourRoutingModule {}
