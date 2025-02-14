import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TodosInitialState } from 'app/store/reducers/todos.reducer';

export const todosState = createFeatureSelector<TodosInitialState>('todos');

export const selectTodos = createSelector(todosState, state => state.todos);

export const selectTodo = createSelector(todosState, state => ({
  loading: state.isFetchingTodo,
  errorMessage: state.errorMessageTodo,
  data: state.todo,
}));

export const selectTodoCreation = createSelector(todosState, state => ({
  loading: state.isCreatingTodo,
  errorMessage: state.errorMessageTodoCreation,
}));
