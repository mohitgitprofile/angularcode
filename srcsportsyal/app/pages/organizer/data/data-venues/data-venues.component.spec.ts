import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataVenuesComponent } from './data-venues.component';

describe('DataVenuesComponent', () => {
  let component: DataVenuesComponent;
  let fixture: ComponentFixture<DataVenuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataVenuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataVenuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
