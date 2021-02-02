import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchReportBasketBallComponent } from './match-report-basket-ball.component';

describe('MatchReportBasketBallComponent', () => {
  let component: MatchReportBasketBallComponent;
  let fixture: ComponentFixture<MatchReportBasketBallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchReportBasketBallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchReportBasketBallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
