import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {
    this.isAuthenticated();
  }

  ngOnInit(): void {
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
  }

  me() {
    return this.router.navigate(['api/v1/users/me'])
  }
}
