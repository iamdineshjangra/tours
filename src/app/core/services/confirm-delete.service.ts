import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDeleteComponent } from 'src/app/shared/components/confirm-delete/confirm-delete.component';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDeleteService {
  private modalRef: NgbModalRef | null = null;
  genericMessage = new BehaviorSubject<string>('')
  deleteStringMessage = new Subject<string>
  message: string = '';
  constructor(private modalService: NgbModal) {}

  open(msg: string, id: number): void {
    this.modalRef = this.modalService.open(ConfirmDeleteComponent);
    this.message = `${msg}/${id}`;
    this.genericMessage.next(msg)
  }

  confirmDelete() {
    if(this.modalRef) {
      this.modalRef.close();
    }
  }

  cancelDelete(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  sendMessage(): void {
    if(this.message) {
      this.deleteStringMessage.next(this.message);
    }
  }
}
