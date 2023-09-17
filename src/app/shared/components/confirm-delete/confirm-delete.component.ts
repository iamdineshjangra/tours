import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfirmDeleteService } from 'src/app/core/services/confirm-delete.service';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss'],
})
export class ConfirmDeleteComponent implements OnInit, OnDestroy {
  genericMessageSubscription: Subscription | undefined;
  genericMessage: string = '';
  constructor(private confirmDeleteService: ConfirmDeleteService) {}

  ngOnInit(): void {
    this.getGenericMessage();
  }

  onCancel() {
    this.confirmDeleteService.cancelDelete();
  }

  onDelete() {
    this.confirmDeleteService.sendMessage();
  }

  getGenericMessage() {
    this.genericMessageSubscription =
      this.confirmDeleteService.genericMessage.subscribe((value) => {
        if (value) {
          this.genericMessage = value;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.genericMessageSubscription) {
      this.genericMessageSubscription.unsubscribe();
    }
  }
}
