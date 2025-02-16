import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthInitialState } from './auth.reducer';

export const authState = createFeatureSelector<AuthInitialState>('auth');

export const selectIsFetchingMe = createSelector(authState, state => state.isFetchingMe);

export const selectSignInError = createSelector(authState, state => state.signInErrorMessage);
export const selectSignUpError = createSelector(authState, state => state.signUpErrorMessage);
export const selectFetchMeError = createSelector(authState, state => state.fetchMeErrorMessage);

export const selectMe = createSelector(authState, state => state.user);
