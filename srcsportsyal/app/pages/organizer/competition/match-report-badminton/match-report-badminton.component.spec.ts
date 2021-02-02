import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchReportBadmintonComponent } from './match-report-badminton.component';

describe('MatchReportBadmintonComponent', () => {
  let component: MatchReportBadmintonComponent;
  let fixture: ComponentFixture<MatchReportBadmintonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchReportBadmintonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchReportBadmintonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
