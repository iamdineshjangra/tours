import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchedTourComponent } from './components/searched-tour/searched-tour.component';
import { SearchedTourRoutingModule } from './searched-tour-routing.module';
import { TourModule } from '../tour/tour.module';

@NgModule({
  declarations: [SearchedTourComponent],
  imports: [CommonModule, SearchedTourRoutingModule, TourModule],
})
export class SearchedTourModule {}
