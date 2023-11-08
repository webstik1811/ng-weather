import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * We can use this interceptor to handle all http errors
 * Currently we're handling the HTTP status code 404
 */
@Injectable({providedIn: 'root'})
export class HttpErrorInterceptor implements HttpInterceptor {

  private readonly toastr: ToastrService = inject(ToastrService)

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(error => {
        switch (error.status) {
          case 404:
            this.error404(error);
            break;
        }

        return throwError(error);
      })
    )
  }

  private error404(error: HttpErrorResponse) {
    const message: string = error.error.message;

    if (typeof message === 'string') {
      this.toastr.error(message, 'Error', {
        positionClass: 'toast-bottom-center'
      });
    }

    if (Array.isArray(message)) {
      const messages = [];
      message.forEach((errorMessage: { constraints: object }) => {
        const constraints = errorMessage.constraints;

        for (const err of Object.values(constraints)) {
          messages.push(err);
        }
      });

      messages.forEach(err => this.toastr.error(err, 'Error', {
        positionClass: 'toast-bottom-center'
      }));
    }
  }


}
