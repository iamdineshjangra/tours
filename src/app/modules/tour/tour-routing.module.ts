import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToursComponent } from './components/tours/tours.component';

const routes: Routes = [
  {
    path: '',
    component: ToursComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TourRoutingModule {}
