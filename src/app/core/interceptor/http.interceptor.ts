import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  let modifiedReq = req;

  const token = localStorage.getItem('access_token');

  if (token) {
    modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(modifiedReq).pipe(
    tap({
      next: event => {
        if (event instanceof HttpResponse) {
          console.log('Response status: ', event.status);
        }
      },
      error: err => {
        if (err instanceof HttpErrorResponse) {
          console.log('Http Error: ', err.message);

          if (err.status === 401) {
            location.replace('/');
          }
        }
      },
    }),
  );
};
