import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Todo } from 'app/core/models';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  http = inject(HttpClient);

  public fetchTodos() {
    return this.http.get<Array<Todo>>('https://jsonplaceholder.typicode.com/todos');
  }
}
