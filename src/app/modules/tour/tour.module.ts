import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourComponent } from './components/tour/tour.component';
import { ToursComponent } from './components/tours/tours.component';



@NgModule({
  declarations: [
    TourComponent,
    ToursComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TourModule { }
