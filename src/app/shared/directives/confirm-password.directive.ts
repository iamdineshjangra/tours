import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appConfirmPassword]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ConfirmPasswordDirective,
      multi: true,
    },
  ],
})
export class ConfirmPasswordDirective implements Validator {
  @Input('appConfirmPassword')
  confirmControlName: string = '' ;

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control || !control.value)  {
      return null;
    }
    const password = control.root.get(this.confirmControlName);
    return password?.value !== control.value ? { confirmPasswordError: true } : null;
  }
}
