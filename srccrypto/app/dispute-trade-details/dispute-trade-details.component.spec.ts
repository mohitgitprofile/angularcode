import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisputeTradeDetailsComponent } from './dispute-trade-details.component';

describe('DisputeTradeDetailsComponent', () => {
  let component: DisputeTradeDetailsComponent;
  let fixture: ComponentFixture<DisputeTradeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisputeTradeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisputeTradeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
