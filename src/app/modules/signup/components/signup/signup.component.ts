import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: any = FormGroup;
  passwordRegExp: string =
    '^(?=.*[0-9])' +
    '(?=.*[a-z])(?=.*[A-Z])' +
    '(?=.*[@#$%^&+=])' +
    '(?=\\S+$).{8,20}$';
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(15),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.pattern(this.passwordRegExp)],
      ],
    });
  }

  get f() {
    return this.signupForm.controls;
  }
}
