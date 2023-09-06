import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  successMessage: string = '';
  errMessage: string = '';
  constructor(private authService: AuthService){}


  onSubmit(data: NgForm) {

    if(data && data.invalid) {
      this.errMessage = 'Please enter all required field with correct data.'
      return this.removeErrorMessage()
    }
    const email = data.value;
    this.authService.forgetPassword(email).subscribe({
      next: (data) => {
        this.successMessage = data.message
        setTimeout(()=> {
          this.successMessage = data.message
          = ''
        },3000);
      },
      error: (err) => {
        this.errMessage = err.error.errMessage;
        return this.removeErrorMessage();
      }
    })
  }

  removeErrorMessage() {
    setTimeout(() => {
      this.errMessage = '';
    }, 3000)
  }
}
