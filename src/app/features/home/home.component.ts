import { CommonModule } from '@angular/common';
import { Component, inject, signal, OnInit } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { MenuStore } from 'app/store/menu.store';
import { BeveragesListComponent } from 'app/shared/components/common/home/beverages-list/beverages-list.component';

enum BeverageFilters {
  ALL = 'all',
  FAVORITES = 'favorites',
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatButtonToggleModule, BeveragesListComponent],
  providers: [MenuStore],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  menuStore = inject(MenuStore);

  activeFilter = signal<BeverageFilters>(BeverageFilters.ALL);

  allBeverages = this.menuStore.beverages;

  public ngOnInit(): void {
    this.menuStore.fetchAllBeverages();
  }

  public handleChange(filter: BeverageFilters): void {
    this.activeFilter.set(filter);
  }
}
