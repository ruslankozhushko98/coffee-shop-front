import { createAction, props } from '@ngrx/store';

import { User } from 'app/core/models';

export enum AuthActionTypes {
  SIGN_IN = '[AUTH] Sign In',
  SIGN_IN_SUCCESS = '[AUTH] Sign In Success',
  SIGN_IN_ERROR = '[AUTH] Sign In Error',

  SIGN_UP = '[AUTH] Sign Up',
  SIGN_UP_SUCCESS = '[AUTH] Sign Up Success',
  SIGN_UP_ERROR = '[AUTH] Sign Up Error',

  FETCH_ME = '[AUTH] Fetch Me',
  FETCH_ME_SUCCESS = '[AUTH] Fetch Me Success',
  FETCH_ME_ERROR = '[AUTH] Fetch Me Error',
}

export const signIn = createAction(
  AuthActionTypes.SIGN_IN,
  props<{ email: string; password: string }>(),
);

export const signInSuccess = createAction(
  AuthActionTypes.SIGN_IN_SUCCESS,
  props<{ accessToken: string; user: User }>(),
);

export const signInError = createAction(
  AuthActionTypes.SIGN_IN_ERROR,
  props<{ error: string }>(),
);

export const signUp = createAction(
  AuthActionTypes.SIGN_UP,
  props<Omit<User, 'id'> & { password: string }>(),
);

export const signUpSuccess = createAction(
  AuthActionTypes.SIGN_UP_SUCCESS,
  props<{ accessToken: string; user: User }>(),
);

export const signUpError = createAction(
  AuthActionTypes.SIGN_UP_ERROR,
  props<{ error: string }>(),
);

export const fetchMe = createAction(
  AuthActionTypes.FETCH_ME,
);

export const fetchMeSuccess = createAction(
  AuthActionTypes.FETCH_ME_SUCCESS,
  props<{ user: User }>(),
);

export const fetchMeError = createAction(
  AuthActionTypes.FETCH_ME_ERROR,
  props<{ error: string }>(),
);
