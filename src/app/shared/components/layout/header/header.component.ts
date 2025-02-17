import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { select, Store } from '@ngrx/store';

import { selectMe } from 'app/store/auth/auth.selector';

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
  store = inject(Store);
  router = inject(Router);

  user = toSignal(this.store.pipe(select(selectMe)), {
    initialValue: null,
  });

  accessToken = localStorage.getItem('access_token');

  handleSignOut() {
    localStorage.removeItem('access_token');

    if (this.router.url !== '/') {
      this.router.navigate(['/']);
    }
  }
}
