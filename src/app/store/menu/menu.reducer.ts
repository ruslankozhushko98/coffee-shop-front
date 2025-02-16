import { createReducer, on } from '@ngrx/store';

import { Beverage } from 'app/core/models';
import {
  fetchAllBeverages,
  fetchAllBeveragesSuccess,
  fetchAllBeveragesError,
  fetchBeverageById,
  fetchBeverageByIdSuccess,
  fetchBeverageByIdError,
} from 'app/store/menu/menu.actions';

export interface MenuInitialState {
  isFetchingAllBeverages: boolean;
  fetchingAllBeveragesErrorMessage: string;
  beverages: Array<Beverage>;

  isFetchingBeverage: boolean;
  fetchingBeverageErrorMessage: string;
  beverage: Beverage | null;
}

export const menuInitialState: MenuInitialState = {
  isFetchingAllBeverages: false,
  fetchingAllBeveragesErrorMessage: '',
  beverages: [],

  isFetchingBeverage: false,
  fetchingBeverageErrorMessage: '',
  beverage: null,
};

export const menuReducer = createReducer(
  menuInitialState,

  on(fetchAllBeverages, (state) => ({
    ...state,
    isFetchingAllBeverages: true,
    fetchingAllBeveragesErrorMessage: '',
    beverages: [],
  })),

  on(fetchAllBeveragesSuccess, (state, { beverages }) => ({
    ...state,
    isFetchingAllBeverages: false,
    fetchingAllBeveragesErrorMessage: '',
    beverages,
  })),

  on(fetchAllBeveragesError, (state, action) => ({
    ...state,
    isFetchingAllBeverages: false,
    fetchingAllBeveragesErrorMessage: action.error,
    beverages: [],
  })),

  on(fetchBeverageById, (state) => ({
    ...state,
    isFetchingBeverage: true,
    fetchingBeverageErrorMessage: '',
    beverage: null,
  })),

  on(fetchBeverageByIdSuccess, (state, { beverage }) => ({
    ...state,
    isFetchingBeverage: false,
    fetchingBeverageErrorMessage: '',
    beverage,
  })),

  on(fetchBeverageByIdError, (state, action) => ({
    ...state,
    isFetchingBeverage: false,
    fetchingBeverageErrorMessage: action.error,
    beverage: null,
  })),
);
