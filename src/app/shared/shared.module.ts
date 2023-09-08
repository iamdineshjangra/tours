import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ConfirmPasswordDirective } from './directives/confirm-password.directive';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ConfirmPasswordDirective,
    SpinnerComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [HeaderComponent, ConfirmPasswordDirective]
})
export class SharedModule { }
