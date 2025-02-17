import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { AuthService } from 'app/core/services/auth.service';
import {
  signIn,
  signInSuccess,
  signInError,
  signUp,
  signUpSuccess,
  signUpError,
  fetchMe,
  fetchMeSuccess,
  fetchMeError,
} from './auth.actions';

export const signInEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(signIn),
      switchMap((credentials) => authService.signIn(credentials).pipe(
        map(({ accessToken, user }) => signInSuccess({ accessToken, user })),
        catchError(({ error }) => of(signInError({ error: error.message }))),
      )),
    );
  },
  { functional: true },
);

export const signUpEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(signUp),
      switchMap((credentials) => authService.signUp({
        email: credentials.email,
        password: credentials.password,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        dob: credentials.dob,
        gender: credentials.gender,
      }).pipe(
        map(({ accessToken, user }) => signUpSuccess({ accessToken, user })),
        catchError(({ error }) => of(signUpError({ error: error.message }))),
      )),
    );
  },
  { functional: true },
);

export const navigateAfterAuthentication = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(signInSuccess, signUpSuccess),
      tap(() => router.navigate([''])),
    );
  },
  { functional: true, dispatch: false },
);

export const fetchMeEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(fetchMe),
      switchMap(() => authService.fetchMe().pipe(
        map((user) => fetchMeSuccess({ user })),
        catchError(({ error }) => of(fetchMeError({ error: error.message }))),
      )),
    );
  },
  { functional: true },
);
