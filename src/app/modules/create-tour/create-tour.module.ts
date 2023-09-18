import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTourComponent } from './components/create-tour/create-tour.component';
import { CreateTourRoutingModule } from './create-tour-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateTourComponent
  ],
  imports: [
    CommonModule,
    CreateTourRoutingModule,
    ReactiveFormsModule
  ]
})
export class CreateTourModule { }
