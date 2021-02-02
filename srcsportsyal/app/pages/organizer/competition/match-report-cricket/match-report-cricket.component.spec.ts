import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchReportCricketComponent } from './match-report-cricket.component';

describe('MatchReportCricketComponent', () => {
  let component: MatchReportCricketComponent;
  let fixture: ComponentFixture<MatchReportCricketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchReportCricketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchReportCricketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
