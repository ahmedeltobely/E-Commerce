import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { loaderInterceptor } from './core/interceptors/loader-interceptor/laoder-interceptor-interceptor';
import { errorHandlerInterceptor } from './core/interceptors/error-handler/error-handler-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    provideAnimationsAsync(),
    BrowserAnimationsModule,
    provideHttpClient(
      withInterceptors([
        errorHandlerInterceptor,
        loaderInterceptor
      ])),
    provideToastr(),
    NgxSpinnerModule,
    {
      provide: 'SPINNER_CONFIG',
      useValue: {
        type: 'pacman',
        bdColor: 'rgba(0, 0, 0, 0.7)',
        size: 'medium',
        color: '#fff',
        fullScreen: true,
      },
    },
    {
      provide: NgxSpinnerService,
      useClass: NgxSpinnerService,
    },
  ]
};
