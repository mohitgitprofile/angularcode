import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchReportVoleyBallComponent } from './match-report-voley-ball.component';

describe('MatchReportVoleyBallComponent', () => {
  let component: MatchReportVoleyBallComponent;
  let fixture: ComponentFixture<MatchReportVoleyBallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchReportVoleyBallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchReportVoleyBallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
