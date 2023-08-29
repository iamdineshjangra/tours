import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourComponent } from './components/tour/tour.component';
import { ToursComponent } from './components/tours/tours.component';
import { TourRoutingModule } from './tour-routing.module';
import { TourDetailsComponent } from './components/tour-details/tour-details.component';



@NgModule({
  declarations: [
    TourComponent,
    ToursComponent,
    TourDetailsComponent,
  ],
  imports: [
    CommonModule,
    TourRoutingModule
  ]
})
export class TourModule { }
