import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToursComponent } from './components/tours/tours.component';
import { toursResolver } from './resolver/tours.resolver';

const routes: Routes = [
  {
    path: '',
    component: ToursComponent,
    resolve: {tours: toursResolver}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TourRoutingModule {}
