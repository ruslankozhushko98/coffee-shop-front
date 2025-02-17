import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';

import { Beverage } from 'app/core/models';

@Component({
  selector: 'app-beverages-list',
  imports: [MatListModule, CurrencyPipe],
  templateUrl: './beverages-list.component.html',
  styleUrl: './beverages-list.component.scss',
})
export class BeveragesListComponent {
  @Input() beverages: Array<Beverage> = [];
}
