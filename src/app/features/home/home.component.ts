import { CommonModule } from '@angular/common';
import { Component, inject, signal, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { select, Store } from '@ngrx/store';

import { fetchAllBeverages } from 'app/store/menu/menu.actions';
import { selectAllBeverages } from 'app/store/menu/menu.selector';
import { BeveragesListComponent } from 'app/shared/components/common/home/beverages-list/beverages-list.component';

enum BeverageFilters {
  ALL = 'all',
  FAVORITES = 'favorites',
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatButtonToggleModule, BeveragesListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  store = inject(Store);

  activeFilter = signal<BeverageFilters>(BeverageFilters.ALL);

  allBeverages = toSignal(this.store.pipe(select(selectAllBeverages)), {
    initialValue: [],
  });

  public handleChange(filter: BeverageFilters): void {
    this.activeFilter.set(filter);
  }

  public ngOnInit(): void {
    this.store.dispatch(fetchAllBeverages());
  }
}
