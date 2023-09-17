import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: any = FormGroup;
  errMessage: string = '';
  successMessage: string = '';
  passwordRegExp: string =
    '^(?=.*[0-9])' +
    '(?=.*[a-z])(?=.*[A-Z])' +
    '(?=.*[@#$%^&+=])' +
    '(?=\\S+$).{8,20}$';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['tours']);
    }
  }

  ngOnInit(): void {
    this.signupPageValidation();
  }

  signupPageValidation() {
    this.signupForm = this.fb.group(
      {
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
        confirmPassword: [
          '',
          [Validators.required, Validators.pattern(this.passwordRegExp)],
        ],
      }
    );
  }

  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.errMessage = 'Please enter all required field with correct data.'
      return this.removeErrorMessage();
    }
    this.authService.signup(this.signupForm.value).subscribe({
      next: (data) => {
        if (data) {
          this.successMessage = 'Signup successfully'
          setTimeout(()=>{
            this.successMessage = '';
            localStorage.setItem('token', data.token);
            if (data && data.user && data.user.role) {
              localStorage.setItem('role', data.user.role);
            }
            this.router.navigate(['tours']);
          },3000)
        }
      },
      error: (err) => {
        this.errMessage = err.error.errMessage;
        return this.removeErrorMessage();
      },
    });
  }

  removeErrorMessage() {
    setTimeout(() => {
      this.errMessage = '';
    }, 3000)
  }
}
