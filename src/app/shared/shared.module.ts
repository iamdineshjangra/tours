import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ConfirmPasswordDirective } from './directives/confirm-password.directive';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent, ConfirmPasswordDirective, SpinnerComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbTypeaheadModule,
    ReactiveFormsModule,
    FormsModule,
    JsonPipe,
  ],
  exports: [HeaderComponent, ConfirmPasswordDirective],
})
export class SharedModule {}
