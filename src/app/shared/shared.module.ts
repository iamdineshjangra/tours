import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ConfirmPasswordDirective } from './directives/confirm-password.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    ConfirmPasswordDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [HeaderComponent, ConfirmPasswordDirective]
})
export class SharedModule { }
