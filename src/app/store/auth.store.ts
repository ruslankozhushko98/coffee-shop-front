/* eslint-disable max-lines */
import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { pipe, switchMap, tap } from 'rxjs';
import { signalStore, patchState, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';

import { User } from 'app/core/models';
import { AuthService } from 'app/core/services/auth.service';
import { SignInDto, SignUpDto } from 'app/shared/utils/types';

type AuthInitialState = {
  isSigningIn: boolean;
  signInErrorMessage: string;

  isSigningUp: boolean;
  signUpErrorMessage: string;

  isFetchingMe: boolean;
  fetchMeErrorMessage: string;

  user: User | null;
};

const initialState: AuthInitialState = {
  isSigningIn: false,
  signInErrorMessage: '',

  isSigningUp: false,
  signUpErrorMessage: '',

  isFetchingMe: false,
  fetchMeErrorMessage: '',

  user: null,
};

export const AuthStore = signalStore(
  withState(initialState),

  withComputed(({ isSigningIn, isSigningUp, signInErrorMessage, signUpErrorMessage }) => ({
    isSigningIn: computed(isSigningIn),
    isSigningUp: computed(isSigningUp),
    isSignInError: computed(() => signInErrorMessage().length !== 0),
    isSignUpError: computed(() => signUpErrorMessage().length !== 0),
  })),

  withMethods((store, authService = inject(AuthService), router = inject(Router)) => ({
    signIn: rxMethod<SignInDto>(
      pipe(
        tap(() =>
          patchState(store, state => ({
            ...state,
            isSigningIn: true,
            signInErrorMessage: '',
            user: null,
          })),
        ),
        switchMap(dto => authService.signIn(dto).pipe(
          tapResponse({
            next: ({ accessToken, user }) => {
              localStorage.setItem('access_token', accessToken);

              patchState(store, state => ({
                ...state,
                isSigningIn: false,
                signInErrorMessage: '',
                user,
              }));

              router.navigate(['/']);
            },
            error: ({ error }) => patchState(store, state => ({
              ...state,
              isSigningIn: false,
              signInErrorMessage: error.message,
              user: null,
            })),
          }),
        )),
      ),
    ),

    signUp: rxMethod<SignUpDto>(
      pipe(
        tap(() =>
          patchState(store, state => ({
            ...state,
            isSigningUp: true,
            signUpErrorMessage: '',
            user: null,
          })),
        ),
        switchMap(dto => authService.signUp(dto).pipe(
          tapResponse({
            next: ({ accessToken, user }) => {
              localStorage.setItem('access_token', accessToken);

              patchState(store, state => ({
                ...state,
                isSigningUp: false,
                signUpErrorMessage: '',
                user,
              }));

              router.navigate(['/']);
            },
            error: ({ error }) => patchState(store, state => ({
              ...state,
              isSigningUp: false,
              signUpErrorMessage: error.message,
              user: null,
            })),
          }),
        )),
      ),
    ),

    signOut() {
      patchState(store, state => ({
        ...state,
        user: null,
      }));
    },

    fetchMe: rxMethod<void>(
      pipe(
        tap(() =>
          patchState(store, state => ({
            ...state,
            isFetchingMe: true,
            fetchMeErrorMessage: '',
            user: null,
          })),
        ),
        switchMap(() => authService.fetchMe().pipe(
          tapResponse({
            next: (user) => patchState(store, state => ({
              ...state,
              isFetchingMe: false,
              fetchMeErrorMessage: '',
              user,
            })),
            error: ({ error }) => patchState(store, state => ({
              ...state,
              isFetchingMe: false,
              fetchMeErrorMessage: error.message,
              user: null,
            })),
          }),
        )),
      ),
    ),
  })),
);
