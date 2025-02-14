import { createReducer, on } from '@ngrx/store';

import { Todo } from 'app/shared/models';
import {
  fetchTodos,
  fetchTodosSuccess,
  fetchTodosError,
  fetchTodoById,
  fetchTodoByIdSuccess,
  fetchTodoByIdError,
  createTodo,
  createTodoSuccess,
  createTodoError,
} from 'app/store/actions/todos.actions';

export interface TodosInitialState {
  isFetchingTodos: boolean;
  isFetchingTodo: boolean;
  isCreatingTodo: boolean;
  errorMessageTodos: string;
  errorMessageTodo: string;
  errorMessageTodoCreation: string;
  todos: Array<Todo>;
  todo: Todo | null;
}

const initialState: TodosInitialState = {
  isFetchingTodos: false,
  isFetchingTodo: false,
  isCreatingTodo: false,
  errorMessageTodos: '',
  errorMessageTodo: '',
  errorMessageTodoCreation: '',
  todos: [],
  todo: null,
};

export const todosReducer = createReducer(
  initialState,

  on(fetchTodos, state => ({
    ...state,
    isFetchingTodos: true,
    errorMessageTodos: '',
    todos: [],
  })),

  on(fetchTodosSuccess, (state, { todos }) => ({
    ...state,
    isFetchingTodos: false,
    errorMessageTodos: '',
    todos,
  })),

  on(fetchTodosError, (state, { error }) => ({
    ...state,
    isFetchingTodos: false,
    errorMessageTodos: error,
  })),

  on(fetchTodoById, state => ({
    ...state,
    isFetchingTodo: true,
    errorMessageTodo: '',
    todo: null,
  })),

  on(fetchTodoByIdSuccess, (state, { todo }) => ({
    ...state,
    isFetchingTodo: false,
    errorMessageTodo: '',
    todo,
  })),

  on(fetchTodoByIdError, (state, { error }) => ({
    ...state,
    isFetchingTodo: false,
    errorMessageTodo: error,
  })),

  on(createTodo, state => ({
    ...state,
    isCreatingTodo: true,
    errorMessageTodoCreation: '',
  })),

  on(createTodoSuccess, (state, { todo }) => ({
    ...state,
    isCreatingTodo: false,
    errorMessageTodoCreation: '',
    todos: [...state.todos, todo],
  })),

  on(createTodoError, (state, { error }) => ({
    ...state,
    isCreatingTodo: false,
    errorMessageTodoCreation: error,
  })),
);
