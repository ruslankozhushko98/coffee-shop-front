import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { fetchTodos } from 'app/store/actions/todos.actions';
import { selectTodos } from 'app/store/selectors/todos.selector';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
  store = inject(Store);

  todos$ = this.store.select(selectTodos);

  public ngOnInit(): void {
    this.store.dispatch(fetchTodos());
  }
}
