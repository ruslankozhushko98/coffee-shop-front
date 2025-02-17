import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideStore } from '@ngrx/store';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { httpInterceptor } from './core/interceptor/http.interceptor';
import * as authEffects from './store/auth/auth.effects';
import { authReducer } from './store/auth/auth.reducer';
import * as menuEffects from './store/menu/menu.effects';
import { menuReducer } from './store/menu/menu.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore({
      router: routerReducer,
      auth: authReducer,
      menu: menuReducer,
    }),
    provideHttpClient(withInterceptors([httpInterceptor])),
    provideRouterStore(),
    provideEffects(authEffects, menuEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideNativeDateAdapter(),
  ],
};
