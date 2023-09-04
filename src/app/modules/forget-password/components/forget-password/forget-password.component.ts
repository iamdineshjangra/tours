import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  forgetPasswordSuccessMessage: string = '';
  errMessage: string = '';
  constructor(private authService: AuthService){}


  onSubmit(data: NgForm) {
    if(data && data.invalid) {
      console.error('Form is invalid');
      return;
    }
    const email = data.value;
    this.authService.forgetPassword(email).subscribe({
      next: (data) => {
        this.forgetPasswordSuccessMessage = 'Please check your gmail to change password'
        setTimeout(()=> {
          this.forgetPasswordSuccessMessage = ''
        },3000);
      },
      error: (err) => {
        this.errMessage = 'Something went wrong. Please enter field with correct data.'
        setTimeout(()=> {
          this.errMessage = ''
        },3000);
        console.log(err.error.errMessage);
      }
    })
  }
}
