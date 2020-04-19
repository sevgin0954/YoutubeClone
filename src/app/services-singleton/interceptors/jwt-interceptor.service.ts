import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, EMPTY, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services-singleton/auth.service';
import { MainConstants } from 'src/app/shared/constants/main-constants';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const hasSkipHeader = request.headers.has(MainConstants.SKIP_INTERCEPTOR_HEADER);
    if (hasSkipHeader) {
      const modifiedHeaders = request.headers.delete(MainConstants.SKIP_INTERCEPTOR_HEADER);

      return next.handle(request.clone({headers: modifiedHeaders}));
    }

    const token = this.authService.getToken();
    const alteredRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(alteredRequest).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.router.navigate(['/signin']);

          return EMPTY;
        }

        return throwError(error);
      })
    );
  }
}
