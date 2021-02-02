import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchReportGenericTeamComponent } from './match-report-generic-team.component';

describe('MatchReportGenericTeamComponent', () => {
  let component: MatchReportGenericTeamComponent;
  let fixture: ComponentFixture<MatchReportGenericTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchReportGenericTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchReportGenericTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
