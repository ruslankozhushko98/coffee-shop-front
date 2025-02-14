import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Beverage } from 'app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  http = inject(HttpClient);

  public fetchAllBeverages() {
    return this.http.get<Array<Beverage>>('http://localhost:5001/menu/all');
  }

  public fetchBeverageById(beverageId: number) {
    return this.http.get<Beverage>(`http://localhost:5001/menu/beverages/${beverageId}`);
  }
}
