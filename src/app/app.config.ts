import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideRouterStore } from '@ngrx/router-store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { httpInterceptor } from './core/interceptor/http.interceptor';
import * as menuEffects from './store/effects/menu.effects';
import * as todosEffects from './store/effects/todos.effects';
import { menuReducer } from './store/reducers/menu.reducer';
import { todosReducer } from './store/reducers/todos.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore({
      menu: menuReducer,
      todos: todosReducer,
    }),
    provideHttpClient(withInterceptors([httpInterceptor])),
    provideRouterStore(),
    provideEffects(menuEffects, todosEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
