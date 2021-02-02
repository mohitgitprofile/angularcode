import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserTradingComponent } from './view-user-trading.component';

describe('ViewUserTradingComponent', () => {
  let component: ViewUserTradingComponent;
  let fixture: ComponentFixture<ViewUserTradingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUserTradingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserTradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
