import { Component, inject, OnInit } from '@angular/core';

import { AuthStore } from 'app/store/auth.store';

@Component({
  selector: 'main-layout',
  providers: [AuthStore],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements OnInit {
  authStore = inject(AuthStore);

  ngOnInit(): void {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      this.authStore.fetchMe();
    }
  }
}
