import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderHttpInterceptor } from './loader-http-interceptor';

export const InterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: LoaderHttpInterceptor, multi: true },
];
