import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToursComponent } from './components/tours/tours.component';
import { TourRoutingModule } from './tour-routing.module';
import { TourDetailsComponent } from './components/tour-details/tour-details.component';



@NgModule({
  declarations: [
    ToursComponent,
    TourDetailsComponent,
  ],
  imports: [
    CommonModule,
    TourRoutingModule
  ]
})
export class TourModule { }
