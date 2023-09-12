import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: any = FormGroup;
  userId: string = '';
  resetToken: string = '';
  errMessage: string = '';
  successMessage: string = '';
  passwordRegExp: string =
    '^(?=.*[0-9])' +
    '(?=.*[a-z])(?=.*[A-Z])' +
    '(?=.*[@#$%^&+=])' +
    '(?=\\S+$).{8,20}$';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    if(this.authService.isAuthenticated()) {
      this.router.navigate(['tours']);
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.userId = params['userId'];
      this.resetToken = params['resetToken'];
    });
    this.resetPasswordPageValidation();
  }

  resetPasswordPageValidation() {
    this.resetPasswordForm = this.fb.group({
      password: [
        '',
        [Validators.required, Validators.pattern(this.passwordRegExp)],
      ],
      confirmPassword: [
        '',
        [Validators.required, Validators.pattern(this.passwordRegExp)],
      ],
    });
  }

  get f() {
    return this.resetPasswordForm.controls;
  }

  onSubmit() {
    if (this.resetPasswordForm.invalid) {
       this.errMessage = 'Please enter all required field with correct data.'
       return this.removeErrorMessage()
    }
    const { password } = this.resetPasswordForm.value;

    if(!password || !this.userId || !this.resetToken) {
       this.errMessage = 'Either password or user id or reset token is missing'
       return this.removeErrorMessage()
    }

    let userId: number = parseInt(this.userId);

    if(typeof userId !== 'number') {
       this.errMessage = 'Please provide a valid userId'
       return this.removeErrorMessage()
    }

    return this.authService.resetPassword(userId, this.resetToken, password).subscribe({
      next: (data) => {
        if(data && data.message) {
          this.successMessage = data.message
          setTimeout(()=> {
            this.successMessage = ''
            this.router.navigate(['login']);
          }, 3000)
        }
      },
      error: (err) => {
         this.errMessage = err.error.errMessage;
         this.removeErrorMessage()
      }
    })
  }

  removeErrorMessage() {
    setTimeout(() => {
      this.errMessage = '';
    }, 3000)
  }
}
