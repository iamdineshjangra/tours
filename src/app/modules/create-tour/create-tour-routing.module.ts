import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTourComponent } from './components/create-tour/create-tour.component';

const routes: Routes = [
  {
    path: '',
    component: CreateTourComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateTourRoutingModule {}
