import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { SpinnerOverlayService } from 'src/app/core/services/spinner-overlay.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private spinner: SpinnerOverlayService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinner.show();
        return next.handle(req).pipe(
            finalize(() => this.spinner.hide())
        );
    }
}
