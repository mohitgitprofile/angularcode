import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceCityStorageComponent } from './price-city-storage.component';

describe('PriceCityStorageComponent', () => {
  let component: PriceCityStorageComponent;
  let fixture: ComponentFixture<PriceCityStorageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceCityStorageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceCityStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
