import { computed, inject } from '@angular/core';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

import { Beverage } from 'app/core/models';
import { MenuService } from 'app/core/services/menu.service';

export type MenuInitialState = {
  isFetchingAllBeverages: boolean;
  fetchingAllBeveragesErrorMessage: string;
  beverages: Array<Beverage>;

  isFetchingBeverage: boolean;
  fetchingBeverageErrorMessage: string;
  beverage: Beverage | null;
}

const initialState: MenuInitialState = {
  isFetchingAllBeverages: false,
  fetchingAllBeveragesErrorMessage: '',
  beverages: [],

  isFetchingBeverage: false,
  fetchingBeverageErrorMessage: '',
  beverage: null,
};

export const MenuStore = signalStore(
  withState(initialState),

  withComputed(({
    isFetchingAllBeverages,
    fetchingAllBeveragesErrorMessage,
    isFetchingBeverage,
    fetchingBeverageErrorMessage,
  }) => ({
    isFetchingAllBeverages: computed(isFetchingAllBeverages),
    fetchAllBeveragesError: computed(() => fetchingAllBeveragesErrorMessage().length !== 0),
    isFetchingBeverage: computed(isFetchingBeverage),
    fetchBeverageError: computed(fetchingBeverageErrorMessage),
  })),

  withMethods((store, menuService = inject(MenuService)) => ({
    fetchAllBeverages: rxMethod<void>(
      pipe(
        tap(() =>
          patchState(store, state => ({
            ...state,
            isFetchingAllBeverages: true,
            fetchingAllBeveragesErrorMessage: '',
            beverages: [],
          })),
        ),
        switchMap(() => menuService.fetchAllBeverages().pipe(
          tapResponse({
            next: (beverages) => patchState(store, state => ({
              ...state,
              isFetchingAllBeverages: false,
              fetchingAllBeveragesErrorMessage: '',
              beverages,
            })),
            error: ({ error }) => patchState(store, state => ({
              ...state,
              isFetchingAllBeverages: false,
              fetchingAllBeveragesErrorMessage: error.message,
            })),
          }),
        )),
      ),
    ),

    fetchBeverageById: rxMethod<number>(
      pipe(
        tap(() => 
          patchState(store, state => ({
            ...state,
            isFetchingBeverage: true,
            fetchingBeverageErrorMessage: '',
            beverage: null,
          })),
        ),
        switchMap((beverageId) => menuService.fetchBeverageById(beverageId).pipe(
          tapResponse({
            next: (beverage) => patchState(store, state => ({
              ...state,
              isFetchingBeverage: false,
              fetchingBeverageErrorMessage: '',
              beverage,
            })),
            error: ({ error }) => patchState(store, state => ({
              ...state,
              isFetchingBeverage: false,
              fetchingBeverageErrorMessage: error.message,
              beverage: null,
            })),
          }),
        )),
      ),
    ),
  })),
);
