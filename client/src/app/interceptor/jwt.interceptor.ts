import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('token');
  const modifiedReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });
  return next(modifiedReq);
};
