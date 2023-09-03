import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm: any = FormGroup;
  isFormError: boolean = false;
  isDuplicateEmail: boolean = false;
  private isFromErrorSubscription: any = Subscription;
  private isDuplicateEmailSubscription: any = Subscription;
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
      this.router.navigate(['api/v1/tours']);
    }
  }

  ngOnInit(): void {
    this.signupPageValidation();
    this.formErrorSubscribe();
    this.emailErrorSubscribe();
  }

  signupPageValidation() {
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

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }
    this.authService.signup(this.signupForm.value);
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

   emailErrorSubscribe() {
    this.isDuplicateEmailSubscription = this.authService.isDuplicateEmail.subscribe({
       next: (data) => {
         if(data) {
           this.isDuplicateEmail = data;
           setTimeout(()=>{
             this.isDuplicateEmail = false;
           },3000)
         }
       }
     })
   }
 
   ngOnDestroy(): void {
     this.isFromErrorSubscription.unsubscribe();
     this.isDuplicateEmailSubscription.unsubscribe();
   }
}
