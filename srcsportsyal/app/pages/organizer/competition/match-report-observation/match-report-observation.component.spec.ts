import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchReportObservationComponent } from './match-report-observation.component';

describe('MatchReportObservationComponent', () => {
  let component: MatchReportObservationComponent;
  let fixture: ComponentFixture<MatchReportObservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchReportObservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchReportObservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
