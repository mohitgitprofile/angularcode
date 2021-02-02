import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchReportSoccerComponent } from './match-report-soccer.component';

describe('MatchReportSoccerComponent', () => {
  let component: MatchReportSoccerComponent;
  let fixture: ComponentFixture<MatchReportSoccerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchReportSoccerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchReportSoccerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
