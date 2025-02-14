import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from './shared/components/layout/header/header.component';
import { MainLayoutComponent } from './shared/components/layout/main-layout/main-layout.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header,
    MainLayoutComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'coffee-shop-front-angular';
}
