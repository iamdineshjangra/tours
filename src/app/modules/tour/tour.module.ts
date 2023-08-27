import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourComponent } from './components/tour/tour.component';
import { ToursComponent } from './components/tours/tours.component';
import { TourRoutingModule } from './tour-routing.module';



@NgModule({
  declarations: [
    TourComponent,
    ToursComponent
  ],
  imports: [
    CommonModule,
    TourRoutingModule
  ]
})
export class TourModule { }
