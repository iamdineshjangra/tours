import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TourService } from 'src/app/core/services/tour.service';

@Component({
  selector: 'app-create-tour',
  templateUrl: './create-tour.component.html',
  styleUrls: ['./create-tour.component.scss'],
})
export class CreateTourComponent implements OnInit {
  createTourForm: any = FormGroup;
  errMessage: string = '';
  successMessage: string = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tourService: TourService
  ) {}

  ngOnInit(): void {
    this.createTourValidation();
  }

  createTourValidation() {
    this.createTourForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(60),
        ],
      ],
      maxPersonCapacity: [
        '',
        [Validators.required, Validators.min(50), Validators.max(100)],
      ],
      amountPerHead: [
        '',
        [Validators.required, Validators.min(500), Validators.max(20000)],
      ],
      startDate: [],
      endDate: [],
    });
  }

  get f() {
    return this.createTourForm.controls;
  }

  onSubmit() {
    if (!this.createTourForm.valid) {
      return;
    }
    this.tourService.createTour(this.createTourForm.value).subscribe({
      next: (data) => {
        if (data) {
          this.successMessage = 'Tour is created successfully.';
          setTimeout(() => {
            this.successMessage = '';
            this.router.navigate(['tours']);
          }, 3000);
        }
      },
      error: (err) => {
        this.errMessage = err.error.errMessage;
        this.removeErrorMessage();
      },
    });
  }

  removeErrorMessage() {
    setTimeout(() => {
      this.errMessage = '';
    }, 3000);
  }
}
