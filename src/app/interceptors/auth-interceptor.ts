// export interface AuthInterceptor {
// }


import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { finalize, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CommonServiceService } from '../services/common-service.service';

@Injectable()
export class AuthInterceptor {

  constructor(
    private router:Router,
    private _cs:CommonServiceService
  ) { }



  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this._cs.signOut();
          this.router.navigate(['/']);
          localStorage.clear();
        }
        return throwError(error);
      })
    )}
}
