import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, retry, throwError } from 'rxjs';


export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {

  const toastr = inject(ToastrService) 


  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
        toastr.error(error.error.message, 'error');
      return throwError(() => error)
    })
  );

};