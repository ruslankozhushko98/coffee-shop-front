import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, switchMap, map, of } from 'rxjs';

import { TodosService } from 'app/core/services/todos.service';
import { fetchTodos, fetchTodosSuccess, fetchTodosError } from 'app/store/actions/todos.actions';

export const loadTodos = createEffect(
  (actions$ = inject(Actions), todosService = inject(TodosService)) => {
    return actions$.pipe(
      ofType(fetchTodos),
      switchMap(() => todosService.fetchTodos().pipe(
        map(todos => fetchTodosSuccess({ todos })),
        catchError((error) => of(fetchTodosError({ error: error.message }))),
      )),
    );
  },
  { functional: true },
);
