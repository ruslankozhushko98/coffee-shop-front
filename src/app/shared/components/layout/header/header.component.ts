import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AuthStore } from 'app/store/auth.store';

@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class Header {
  router = inject(Router);
  authStore = inject(AuthStore);

  user = this.authStore.user;

  handleSignOut() {
    localStorage.removeItem('access_token');

    this.authStore.signOut();

    if (this.router.url !== '/') {
      this.router.navigate(['/']);
    }
  }
}
