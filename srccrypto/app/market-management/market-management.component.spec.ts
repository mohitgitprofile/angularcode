import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketManagementComponent } from './market-management.component';

describe('MarketManagementComponent', () => {
  let component: MarketManagementComponent;
  let fixture: ComponentFixture<MarketManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
