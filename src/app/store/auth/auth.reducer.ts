import { createReducer, on } from '@ngrx/store';

import { User } from 'app/core/models';
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

export interface AuthInitialState {
  signInErrorMessage: string;
  signUpErrorMessage: string;

  isFetchingMe: boolean;
  fetchMeErrorMessage: string;

  user: User | null;
}

export const authInitialState: AuthInitialState = {
  signInErrorMessage: '',
  signUpErrorMessage: '',

  isFetchingMe: false,
  fetchMeErrorMessage: '',

  user: null,
};

export const authReducer = createReducer(
  authInitialState,

  on(signIn, (state) => ({
    ...state,
    isSigningIn: true,
    signInErrorMessage: '',
    user: null,
  })),

  on(signInSuccess, (state, { accessToken, user }) => {
    localStorage.setItem('access_token', accessToken);

    return {
      ...state,
      isSigningIn: false,
      signInErrorMessage: '',
      user,
    };
  }),

  on(signInError, (state, { error }) => ({
    ...state,
    isSigningIn: false,
    signInErrorMessage: error,
    user: null,
  })),

  on(signUp, (state) => ({
    ...state,
    isSigningUp: true,
    signUpErrorMessage: '',
    user: null,
  })),

  on(signUpSuccess, (state, { accessToken, user }) => {
    localStorage.setItem('access_token', accessToken);

    return {
      ...state,
      isSigningUp: false,
      signUpErrorMessage: '',
      user,
    };
  }),

  on(signUpError, (state, { error }) => ({
    ...state,
    isSigningUp: false,
    signUpErrorMessage: error,
    user: null,
  })),

  on(fetchMe, (state) => ({
    ...state,
    isFetchingMe: true,
    fetchMeErrorMessage: '',
    user: null,
  })),

  on(fetchMeSuccess, (state, { user }) => ({
    ...state,
    isFetchingMe: false,
    fetchMeErrorMessage: '',
    user,
  })),

  on(fetchMeError, (state, { error }) => ({
    ...state,
    isFetchingMe: false,
    fetchMeErrorMessage: error,
    user: null,
  })),
);
