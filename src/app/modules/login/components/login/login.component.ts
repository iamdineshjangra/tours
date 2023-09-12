import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{
  loginForm: any = FormGroup;
  errMessage: string = '';
  successMessage: string = '';
  passwordRegExp: string =
    '^(?=.*[0-9])' +
    '(?=.*[a-z])(?=.*[A-Z])' +
    '(?=.*[@#$%^&+=])' +
    '(?=\\S+$).{8,20}$';
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    if(this.authService.isAuthenticated()) {
      this.router.navigate(['tours']);
    }
  }

  ngOnInit(): void {
    this.loginFormValidation();
  }

  loginFormValidation() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.pattern(this.passwordRegExp)],
      ],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.errMessage = 'Please enter all required field with correct data.'
      return this.removeErrorMessage();
    }
    this.authService.login(this.loginForm.value).subscribe({
      next: (data) => {
        if (data) {
          this.successMessage = 'Logged in successfully'
          setTimeout(()=> {
            this.successMessage = '';
            localStorage.setItem('token', data.token);
            this.router.navigate(['tours']);
          }, 3000)
        }
      },
      error: (err) => {
        this.errMessage = err.error.errMessage;
        return this.removeErrorMessage()
      },
    });
  }

  removeErrorMessage() {
    setTimeout(() => {
      this.errMessage = '';
    }, 3000)
  }

}
