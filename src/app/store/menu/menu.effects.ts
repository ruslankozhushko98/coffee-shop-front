import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { MenuService } from 'app/core/services/menu.service';
import {
  fetchAllBeverages,
  fetchAllBeveragesSuccess,
  fetchAllBeveragesError,
  fetchBeverageById,
  fetchBeverageByIdSuccess,
  fetchBeverageByIdError,
} from 'app/store/menu/menu.actions';

export const loadAllBeverages = createEffect(
  (actions$ = inject(Actions), menuService = inject(MenuService)) => {
    return actions$.pipe(
      ofType(fetchAllBeverages),
      switchMap(() => menuService.fetchAllBeverages().pipe(
        map(beverages => fetchAllBeveragesSuccess({ beverages })),
        catchError(({ error }) => of(fetchAllBeveragesError({ error: error.message }))),
      )),
    );
  }, { functional: true },
);

export const loadBeverageById = createEffect(
  (actions$ = inject(Actions), menuService = inject(MenuService)) => {
    return actions$.pipe(
      ofType(fetchBeverageById),
      switchMap(({ beverageId }) => menuService.fetchBeverageById(beverageId).pipe(
        map(beverage => fetchBeverageByIdSuccess({ beverage })),
        catchError(({ error }) => of(fetchBeverageByIdError({ error: error.message }))),
      )),
    );
  }, { functional: true },
);
