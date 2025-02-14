import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { fetchAllBeverages } from 'app/store/actions/menu.actions';
import { selectAllBeverages } from 'app/store/selectors/menu.selector';

@Component({
  selector: 'app-beverages',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './beverages.component.html',
  styleUrl: './beverages.component.scss',
})
export class BeveragesComponent implements OnInit {
  store = inject(Store);

  beverages$ = this.store.select(selectAllBeverages);

  public ngOnInit(): void {
    this.store.dispatch(fetchAllBeverages());
  }
}
