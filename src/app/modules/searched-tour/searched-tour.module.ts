import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchedTourComponent } from './components/searched-tour/searched-tour.component';
import { SearchedTourRoutingModule } from './searched-tour-routing.module';

@NgModule({
  declarations: [SearchedTourComponent],
  imports: [CommonModule, SearchedTourRoutingModule],
})
export class SearchedTourModule {}
