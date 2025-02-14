import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from './shared/components/layout/header/header.component';
import { MainLayoutComponent } from './shared/components/layout/main-layout/main-layout.component';
import { TodoListComponent } from './features/todos/todo-list/todo-list.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header,
    MainLayoutComponent,
    TodoListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'coffee-shop-front-angular';
}
