import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy{
  loginForm: any = FormGroup;
  isFormError: boolean = false;
  private isFromErrorSubscription: any = Subscription;
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
      this.router.navigate(['api/v1/tours']);
    }
  }

  ngOnInit(): void {
    this.loginFormValidation();
    this.formErrorSubscribe();
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
      return;
    }
    this.authService.login(this.loginForm.value);
  }

  formErrorSubscribe() {
   this.isFromErrorSubscription = this.authService.isFromError.subscribe({
      next: (data) => {
        if(data) {
          this.isFormError = data;
          setTimeout(()=>{
            this.isFormError = false;
          },3000)
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.isFromErrorSubscription.unsubscribe();
  }

}
