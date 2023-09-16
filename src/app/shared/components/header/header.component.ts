import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, OperatorFunction, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Tour } from 'src/app/core/models/tour';
import { AuthService } from 'src/app/core/services/auth.service';
import { TourService } from 'src/app/core/services/tour.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  tours: Tour[] = [];
  filteredTour: Tour[] = [];
  constructor(
    private authService: AuthService,
    private tourService: TourService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.isAuthenticated();
  }

  ngOnInit(): void {
    this.getAllTours();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    this.getAllTours();
  }

  getAllTours() {
    this.tourService.getAllTours().subscribe({
      next: (data) => {
        if (data && data.tours && data.tours.length) {
          this.tours = data.tours;
        }
      },
      error: (error) => {
        console.error(error.error.errMessage);
      },
    });
  }

  formatter = (result: string) => result.toUpperCase();

  search: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) => {
        if (term === '') {
          return [];
        }
        const uniqueTitles: string[] = [];
        this.tours.forEach((tour) => {
          const title = tour.title.toLowerCase();
          if (
            title.includes(term.toLowerCase()) &&
            !uniqueTitles.includes(title)
          ) {
            uniqueTitles.push(title);
          }
        });
        return uniqueTitles.slice(0, 10);
      })
    );

  onSearchResultSelected(selectedItem: any) {
    if (selectedItem.item) {
      this.router.navigate(['searchedTour', selectedItem.item]);
    }
  }
}
