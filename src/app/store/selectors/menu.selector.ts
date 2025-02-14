import { createFeatureSelector, createSelector } from '@ngrx/store';

import { MenuInitialState } from 'app/store/reducers/menu.reducer';

export const menuState = createFeatureSelector<MenuInitialState>('menu');

export const selectIsFetchingAllBeverages = createSelector(menuState, state => state.isFetchingAllBeverages);
export const selectAllBeverages = createSelector(menuState, state => {
  return state.beverages;
});
export const selectFetchingAllBeveragesErrorMessage = createSelector(
  menuState,
  state => state.fetchingAllBeveragesErrorMessage,
);

export const selectBeverage = createSelector(menuState, state => ({
  isFetching: state.isFetchingBeverage,
  errorMessage: state.fetchingBeverageErrorMessage,
  beverage: state.beverage,
}));
