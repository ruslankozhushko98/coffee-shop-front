import { createAction, props } from '@ngrx/store';

import { Todo } from 'app/shared/models';

export enum TodosActionTypes {
  FETCH_TODOS = '[TODOS] Fetch All',
  FETCH_TODOS_SUCCESS = '[TODOS] Fetch All Success',
  FETCH_TODOS_ERROR = '[TODOS] Fetch All Error',

  FETCH_TODO_BY_ID = '[TODOS] Fetch By ID',
  FETCH_TODO_BY_ID_SUCCESS = '[TODOS] Fetch By ID Success',
  FETCH_TODO_BY_ID_ERROR = '[TODOS] Fetch By ID Error',

  CREATE_TODO = '[TODOS] Create',
  CREATE_TODO_SUCCESS = '[TODOS] Create Success',
  CREATE_TODO_ERROR = '[TODOS] Create Error',
}

export const fetchTodos = createAction(
  TodosActionTypes.FETCH_TODOS,
);

export const fetchTodosSuccess = createAction(
  TodosActionTypes.FETCH_TODOS_SUCCESS,
  props<{ todos: Array<Todo> }>(),
);

export const fetchTodosError = createAction(
  TodosActionTypes.FETCH_TODOS_ERROR,
  props<{ error: string }>(),
);

export const fetchTodoById = createAction(
  TodosActionTypes.FETCH_TODOS,
  props<{ todoId: number }>(),
);

export const fetchTodoByIdSuccess = createAction(
  TodosActionTypes.FETCH_TODOS_SUCCESS,
  props<{ todo: Todo }>(),
);

export const fetchTodoByIdError = createAction(
  TodosActionTypes.FETCH_TODOS_ERROR,
  props<{ error: string }>(),
);

export const createTodo = createAction(
  TodosActionTypes.CREATE_TODO,
  props<{ title: string }>(),
);

export const createTodoSuccess = createAction(
  TodosActionTypes.CREATE_TODO_SUCCESS,
  props<{ todo: Todo }>(),
);

export const createTodoError = createAction(
  TodosActionTypes.CREATE_TODO_ERROR,
  props<{ error: string }>(),
);
