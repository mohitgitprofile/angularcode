import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchReportTableTennisComponent } from './match-report-table-tennis.component';

describe('MatchReportTableTennisComponent', () => {
  let component: MatchReportTableTennisComponent;
  let fixture: ComponentFixture<MatchReportTableTennisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchReportTableTennisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchReportTableTennisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
