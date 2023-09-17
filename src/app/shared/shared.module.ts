import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ConfirmPasswordDirective } from './directives/confirm-password.directive';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';

@NgModule({
  declarations: [HeaderComponent, ConfirmPasswordDirective, SpinnerComponent, ConfirmDeleteComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbTypeaheadModule,
    ReactiveFormsModule,
    FormsModule,
    JsonPipe,
    NgbModule
  ],
  exports: [HeaderComponent, ConfirmPasswordDirective, ConfirmDeleteComponent],
})
export class SharedModule {}
