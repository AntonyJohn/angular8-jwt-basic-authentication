import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '@app/_services';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService,private spinnerService: NgxSpinnerService,) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                console.log("Error interceptor")
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                //location.reload(true);
            }
            this.spinnerService.hide();
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }

    /*errorHandler(error: HttpErrorResponse) {
        let errorMessage = '';
        console.log(error)
        if (error.error instanceof Object) {
          if (error.error.message == undefined) {
            errorMessage = `Error: ${error.error.responseBody.errorMessage}`;
          } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        this.spinnerService.hide();
        this.toastr.errorToastr(errorMessage, "", { position: "bottom-full-width" });
        return throwError(errorMessage);
      }*/
}