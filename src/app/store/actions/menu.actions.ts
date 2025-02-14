import { createAction, props } from '@ngrx/store';

import { Beverage } from 'app/shared/models';

export enum MenuActionTypes {
  FETCH_ALL_BEVERAGES = '[MENU] Fetch All Beverages',
  FETCH_ALL_BEVERAGES_SUCCESS = '[MENU] Fetch All Beverages Success',
  FETCH_ALL_BEVERAGES_ERROR = '[MENU] Fetch All Beverages Error',

  FETCH_BEVERAGE_BY_ID = '[MENU] Fetch Beverage By Id',
  FETCH_BEVERAGE_BY_ID_SUCCESS = '[MENU] Fetch Beverage By Id Success',
  FETCH_BEVERAGE_BY_ID_ERROR = '[MENU] Fetch Beverage By Id Error',
}

export const fetchAllBeverages = createAction(
  MenuActionTypes.FETCH_ALL_BEVERAGES,
);

export const fetchAllBeveragesSuccess = createAction(
  MenuActionTypes.FETCH_ALL_BEVERAGES_SUCCESS,
  props<{ beverages: Array<Beverage> }>(),
);

export const fetchAllBeveragesError = createAction(
  MenuActionTypes.FETCH_ALL_BEVERAGES_SUCCESS,
  props<{ error: string }>(),
);

export const fetchBeverageById = createAction(
  MenuActionTypes.FETCH_BEVERAGE_BY_ID,
  props<{ beverageId: number }>(),
);

export const fetchBeverageByIdSuccess = createAction(
  MenuActionTypes.FETCH_BEVERAGE_BY_ID_SUCCESS,
  props<{ beverage: Beverage }>(),
);
export const fetchBeverageByIdError = createAction(
  MenuActionTypes.FETCH_BEVERAGE_BY_ID_ERROR,
  props<{ error: string }>(),
);
