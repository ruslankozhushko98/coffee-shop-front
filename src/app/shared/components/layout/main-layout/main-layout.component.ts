import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { fetchMe } from 'app/store/auth/auth.actions';

@Component({
  selector: 'main-layout',
  imports: [],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements OnInit {
  store = inject(Store);

  ngOnInit(): void {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      this.store.dispatch(fetchMe());
    }
  }
}
