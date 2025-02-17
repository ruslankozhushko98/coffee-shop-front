import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeveragesListComponent } from './beverages-list.component';

describe('BeveragesListComponent', () => {
  let component: BeveragesListComponent;
  let fixture: ComponentFixture<BeveragesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeveragesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeveragesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
