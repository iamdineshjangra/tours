import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: User | null | undefined = null;
  errMessage: string = '';
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.me()
  }

  me() {
    return this.userService.me().subscribe({
      next: (data) => {
        this.user = data.user;
      },
      error: (err) => {
        console.log(err.error.errMessage)
        this.errMessage = err.error.errMessage;
      }
    })
  }
}
