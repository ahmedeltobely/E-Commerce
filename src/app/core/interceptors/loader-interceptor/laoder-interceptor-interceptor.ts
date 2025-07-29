import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, tap } from 'rxjs';
import { HttpRequest } from '@angular/common/http';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(NgxSpinnerService);
  const token = localStorage.getItem('token');
  const authReq: HttpRequest<any> = req.clone({
    setHeaders: {
      Token: token ? `${token}` : ''
    }
  });

  spinnerService.show();
  return next(authReq).pipe(
    finalize(() => spinnerService.hide())
  );
};
